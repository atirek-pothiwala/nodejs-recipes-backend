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
        const { photoUrl, name, description, chef, type, prepTime, cookTime, servings, ingredients, instructions, tips } = req.body;
        if (!photoUrl || !name || !description || !chef || !type || !prepTime || !cookTime || !servings) {
            return res.status(StatusCode.BadRequest).json({ error: StatusMessage.BadRequest });
        }

        const params = [photoUrl, name, description, chef, type, prepTime, cookTime, servings];
        const connect = await db.getConnection();
        try {
            await connect.beginTransaction();
            const [result] = await connect.query(SqlQuery.createRecipe, params);
            const recipeId = result.insertId;

            const ingredientValues = ingredients.map(i => [recipeId, i.name, i.quantity, i.unit]);
            await connect.query(SqlQuery.addIngredients, [ingredientValues]);

            const instructionValues = instructions.map(i => [recipeId, i.stepNumber, i.description]);
            await connect.query(SqlQuery.addInstructions, [instructionValues]);

            const tipsValues = tips.map(i => [recipeId, i]);
            await connect.query(SqlQuery.addTips, [tipsValues]);

            res.status(StatusCode.OK).json({ id: result.insertId });
            await connect.commit();
        } catch (error) {
            res.status(StatusCode.InternalServerError).json({ error: error.message });
            await connect.rollback();
        } finally {
            connect.release();
        }
    }

    // GET API - List All Recipes
    static async list(req, res) {
        try {
            const [results] = await db.query(SqlQuery.listRecipe);
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
                tips: JSON.parse(row.tips || "[]")
            }));
            return res.status(StatusCode.OK).json(filterResult);
        } catch (error) {
            return res.status(StatusCode.InternalServerError).json({ error: error.message });
        }
    }

    // DELETE API - Delete Recipe
    static async delete(req, res) {
        const { id } = req.body;
        if (!id) {
            return res.status(StatusCode.BadRequest).json({ error: StatusMessage.BadRequest });
        }
        const connect = await db.getConnection();
        try {
            await connect.beginTransaction();
            const [results] = await connect.query(SqlQuery.getRecipeViaId, id);
            if (results.length > 0) {
                let recipe = results[0];
                await connect.query(SqlQuery.deleteRecipe, id)
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