const { StatusCode, StatusMessage } = require("../config/StatusCode")
const SqlQuery = require("../config/SqlQuery.js")
const db = require("../config/Database.js")
const fs = require("fs");
const path = require("path");


class RecipeController {

    //Multipart API - Upload Image
    static async upload(req, res) {
        const photo = req.file ? req.file.filename : null;
        if (!photo) {
            return res.status(StatusCode.BadRequest).json({ error: StatusMessage.BadRequest });
        }
        return res.status(StatusCode.OK).json({ url: `/uploads/recipes/${photo}` });
    }

    // POST API - Create Recipe
    static async create(req, res) {
        const { photoUrl, name, description, chef, type, prepTime, cookTime, servings } = req.body;
        if (!photoUrl || !name || !description || !chef || !type || !prepTime || !cookTime || !servings) {
            return res.status(StatusCode.BadRequest).json({ error: StatusMessage.BadRequest });
        }

        const params = [photoUrl, name, description, chef, type, prepTime, cookTime, servings];
        try {
            const [result] = await db.query(SqlQuery.createRecipe, params);
            if (!result.insertId) {
                return res.status(StatusCode.NotFound).json({ error: StatusMessage.NotFound });
            }
            return res.status(StatusCode.OK).json({ id: result.insertId });
        } catch (error) {
            return res.status(StatusCode.InternalServerError).json({ error: error.message });
        }
    }

    static async addIngredients(req, res) {
        const { id, ingredients } = req.body;
        if (!id || !Array.isArray(ingredients) || ingredients.length === 0) {
            return res.status(StatusCode.BadRequest).json({ error: StatusMessage.BadRequest });
        }
        try {
            const values = ingredients.map(i => [id, i.name, i.quantity]);
            const [results] = await db.query(SqlQuery.addIngredients, [values]);
            if (results.length == 0) {
                return res.status(StatusCode.NotFound).json({ error: StatusMessage.NotFound });
            }
            return res.status(StatusCode.NoContent).end();
        } catch (error) {
            return res.status(StatusCode.InternalServerError).json({ error: error.message });
        }
    }

    static async addInstructions(req, res) {
        const { id, instructions } = req.body;
        if (!id || !Array.isArray(instructions) || instructions.length === 0) {
            return res.status(StatusCode.BadRequest).json({ error: StatusMessage.BadRequest });
        }
        try {
            const values = instructions.map(i => [id, i.stepNumber, i.description]);
            const [results] = await db.query(SqlQuery.addInstructions, [values]);
            if (results.length == 0) {
                return res.status(StatusCode.NotFound).json({ error: StatusMessage.NotFound });
            }
            return res.status(StatusCode.NoContent).end();
        } catch (error) {
            return res.status(StatusCode.InternalServerError).json({ error: error.message });
        }
    }

    static async addTips(req, res) {
        const { id, tips } = req.body;
        if (!id || !Array.isArray(tips) || tips.length === 0) {
            return res.status(StatusCode.BadRequest).json({ error: StatusMessage.BadRequest });
        }
        try {
            const values = tips.map(i => [id, i]);
            const [results] = await db.query(SqlQuery.addTips, [values]);
            if (results.length == 0) {
                return res.status(StatusCode.NotFound).json({ error: StatusMessage.NotFound });
            }
            return res.status(StatusCode.NoContent).end();
        } catch (error) {
            return res.status(StatusCode.InternalServerError).json({ error: error.message });
        }
    }

    static async addNutritions(req, res) {
        const { id, nutritions } = req.body;
        if (!id || !nutritions) {
            return res.status(StatusCode.BadRequest).json({ error: StatusMessage.BadRequest });
        }

        if (!nutritions.calories || !nutritions.fat || !nutritions.saturatedFat || !nutritions.transFat || !nutritions.carbohydrate ||
            !nutritions.fibre || !nutritions.sugar || !nutritions.protein || !nutritions.sodium) {
            return res.status(StatusCode.BadRequest).json({ error: StatusMessage.BadRequest });
        }

        try {
            const params = [id, nutritions.calories, nutritions.fat, nutritions.saturatedFat, nutritions.transFat, nutritions.carbohydrate, nutritions.fibre, nutritions.sugar, nutritions.protein, nutritions.sodium]
            const [results] = await db.query(SqlQuery.addNutritions, params);
            if (results.length == 0) {
                return res.status(StatusCode.NotFound).json({ error: StatusMessage.NotFound });
            }
            return res.status(StatusCode.NoContent).end();
        } catch (error) {
            return res.status(StatusCode.InternalServerError).json({ error: error.message });
        }
    }

    static async addVariations(req, res) {
        const { id, variations } = req.body;
        if (!id || !Array.isArray(variations) || variations.length === 0) {
            return res.status(StatusCode.BadRequest).json({ error: StatusMessage.BadRequest });
        }
        try {
            const values = variations.map(i => [id, i.name, i.description]);
            const [results] = await db.query(SqlQuery.addVariations, [values]);
            if (results.length == 0) {
                return res.status(StatusCode.NotFound).json({ error: StatusMessage.NotFound });
            }
            return res.status(StatusCode.NoContent).end();
        } catch (error) {
            return res.status(StatusCode.InternalServerError).json({ error: error.message });
        }
    }

    // GET API - List All Recipes
    static async list(req, res) {
        if (!req.account.id) {
            return res.status(StatusCode.UnAuthorized).json({ error: StatusMessage.UnAuthorized });
        }
        try {
            const [results] = await db.query(SqlQuery.listRecipe);
            return res.status(StatusCode.OK).json(results);
        } catch (error) {
            return res.status(StatusCode.InternalServerError).json({ error: error.message });
        }
    }

    // GET API - List Recipes using Ids
    static async filterList(req, res) {
        if (!req.account.id) {
            return res.status(StatusCode.UnAuthorized).json({ error: StatusMessage.UnAuthorized });
        }
        const ids = req.query.ids;
        try {
            const [results] = await db.query(SqlQuery.listRecipeViaIds, [ids.split(',')]);
            return res.status(StatusCode.OK).json(results);
        } catch (error) {
            return res.status(StatusCode.InternalServerError).json({ error: error.message });
        }
    }

    // GET API - List All Recipes
    static async detail(req, res) {
        if (!req.account.id) {
            return res.status(StatusCode.UnAuthorized).json({ error: StatusMessage.UnAuthorized });
        }
        const recipeId = req.query.id;
        if (!recipeId) {
            return res.status(StatusCode.BadRequest).json({ error: StatusMessage.BadRequest });
        }
        try {
            const [results] = await db.query(SqlQuery.getRecipeViaId, recipeId);
            if (results.length == 0 || results[0].recipe_id == null) {
                return res.status(StatusCode.NotFound).json({ error: StatusMessage.NotFound });
            }
            const filterResult = results.map(row => ({
                id: row.recipe_id,
                photo: row.photo,
                name: row.name,
                description: row.description,
                chef: row.chef,
                type: row.type,
                prepTime: row.prep_time,
                cookTime: row.cook_time,
                servings: row.servings,
                createdAt: row.created_at,
                ingredients: JSON.parse(row.ingredients || "[]"),
                instructions: JSON.parse(row.instructions || "[]"),
                nutritions: JSON.parse(row.nutritions || "[]")[0],
                tips: JSON.parse(row.tips || "[]"),
                variations: JSON.parse(row.variations || "[]")
            }));
            return res.status(StatusCode.OK).json(filterResult[0]);
        } catch (error) {
            return res.status(StatusCode.InternalServerError).json({ error: error.message });
        }
    }

    // DELETE API - Delete Recipe
    static async delete(req, res) {
        const recipeId = req.params.id;
        if (!recipeId) {
            return res.status(StatusCode.BadRequest).json({ error: StatusMessage.BadRequest });
        }
        const connect = await db.getConnection();
        try {
            await connect.beginTransaction();
            const [results] = await connect.query(SqlQuery.getRecipeViaId, recipeId);
            if (results.length > 0) {
                let recipe = results[0];
                await connect.query(SqlQuery.deleteRecipe, recipeId)
                if (recipe.photo) {
                    const filePath = path.join(__dirname, `../..${recipe.photo}`);
                    console.log(`File Path: ${filePath}`);
                    if (fs.existsSync(filePath)) {
                        console.log('File Path: Exists');
                        fs.unlinkSync(filePath);
                    }
                }
                res.status(StatusCode.NoContent).end();
            } else {
                res.status(StatusCode.NotFound).json({ error: StatusMessage.NotFound });
            }
            await connect.commit();
        } catch (error) {
            res.status(StatusCode.InternalServerError).json({ error: error.message });
            await connect.rollback();
        } finally {
            connect.release();
        }
    }
}

module.exports = RecipeController;