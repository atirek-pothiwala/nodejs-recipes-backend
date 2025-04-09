class SqlQuery {
    // ACCOUNT QUERIES
    static createAccount = "INSERT INTO accounts (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";
    static getAccountViaEmail = "SELECT * FROM accounts WHERE email = ? LIMIT 1";
    static getAccountViaId = "SELECT * FROM accounts WHERE id = ? LIMIT 1";
    static deleteAccount = "DELETE FROM accounts WHERE id = ?";
    static uploadPhoto = "UPDATE accounts SET photo = ? WHERE id = ?";
    static updateAccount = "UPDATE accounts SET first_name = ?, last_name = ? WHERE id = ?";
    static updatePassword = "UPDATE accounts SET password = ? WHERE id = ?";

    // RECIPE QUERIES
    static createRecipe = "INSERT INTO recipes (photo, name, description, chef, type, prep_time, cook_time, servings) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    static listRecipe = "SELECT * FROM recipes"
    static listRecipeViaIds = "SELECT * FROM recipes WHERE id IN (?)"

    static getRecipeViaId = `
    SELECT
    r.id AS recipe_id,
    r.photo,
    r.name,
    r.description,
    r.chef,
    r.type,
    r.prep_time,
    r.cook_time,
    r.servings,
    r.created_at,

    CONCAT('[', GROUP_CONCAT(DISTINCT 
        CONCAT(
        '{"id":', i.id,
        ',"name":"', i.name,
        '","quantity":"', i.quantity, '"}'
        ) 
        SEPARATOR ','), ']') AS ingredients,

    CONCAT('[', GROUP_CONCAT(DISTINCT 
        CONCAT(
        '{"id":', ins.id,
        ',"stepNumber":', ins.step_number,
        ',"description":"', ins.description, '"}'
        ) 
        ORDER BY ins.step_number
        SEPARATOR ','), ']') AS instructions,

    CONCAT('[', GROUP_CONCAT(DISTINCT 
        CONCAT(
        '{"id":', t.id,
        ',"description":"', t.description, '"}'
        ) 
        SEPARATOR ','), ']') AS tips,

    CONCAT('[', GROUP_CONCAT(DISTINCT 
        CONCAT(
        '{"id":', n.id,
        ',"calories":"', n.calories,
        '","fat":"', n.fat,
        '","saturated_fat":"', n.saturated_fat,
        '","trans_fat":"', n.trans_fat,
        '","carbohydrate":"', n.carbohydrate,
        '","fibre":"', n.fibre,
        '","sugar":"', n.sugar,
        '","protein":"', n.protein,
        '","sodium":"', n.sodium, '"}'
        )
        SEPARATOR ','), ']') AS nutritions,

    CONCAT('[', GROUP_CONCAT(DISTINCT 
        CONCAT(
        '{"id":', v.id,
        ',"name":"', v.name,
        '","description":"', v.description, '"}'
        )
        SEPARATOR ','), ']') AS variations

    FROM recipes r
    LEFT JOIN ingredients i ON r.id = i.recipe_id
    LEFT JOIN instructions ins ON r.id = ins.recipe_id
    LEFT JOIN tips t ON r.id = t.recipe_id
    LEFT JOIN nutritions n ON r.id = n.recipe_id
    LEFT JOIN variations v ON r.id = v.recipe_id
    WHERE r.id = ?
    GROUP BY r.id;`

    static deleteRecipe = "DELETE FROM recipes WHERE id = ?";

    /*    
        static listRecipe = `
        SELECT
        r.id AS recipe_id,
        r.photo,
        r.name,
        r.description,
        r.chef,
        r.type,
        r.prep_time,
        r.cook_time,
        r.servings,
        r.created_at,
        CONCAT('[', GROUP_CONCAT(DISTINCT CONCAT('{\"id\":', i.id, ',\"name\":\"', i.name, '\",\"quantity\":', i.quantity, ',\"unit\":\"', i.unit, '\"}') SEPARATOR ','), ']') AS ingredients, 
        CONCAT('[', GROUP_CONCAT(DISTINCT CONCAT('{\"id\":', ins.id, ',\"stepNumber\":', ins.step_number, ',\"description\":\"', ins.description, '\"}') ORDER BY ins.step_number SEPARATOR ','), ']') AS instructions, 
        CONCAT('[', GROUP_CONCAT(DISTINCT CONCAT('{\"id\":', t.id, ',\"description\":\"', t.description, '\"}') SEPARATOR ','), ']') AS tips 
        FROM recipes r
        LEFT JOIN ingredients i ON r.id = i.recipe_id
        LEFT JOIN instructions ins ON r.id = ins.recipe_id
        LEFT JOIN tips t ON r.id = t.recipe_id
        GROUP BY r.id;`;
        static listRecipeNonSupported = `
        SELECT
        r.id AS recipe_id,
        r.photo,
        r.name,
        r.description,
        r.chef,
        r.type,
        r.prep_time,
        r.cook_time,
        r.servings,
        r.created_at,
        JSON_ARRAYAGG(DISTINCT JSON_OBJECT("name", i.name, "quantity", i.quantity)) AS ingredients,
        JSON_ARRAYAGG(DISTINCT JSON_OBJECT("step", ins.step_number, "description", ins.description) ORDER BY ins.step_number) AS instructions,
        JSON_ARRAYAGG(DISTINCT t.description) AS tips
        FROM recipes r
        LEFT JOIN ingredients i ON r.id = i.recipe_id
        LEFT JOIN instructions ins ON r.id = ins.recipe_id
        LEFT JOIN tips t ON r.id = t.recipe_id
        GROUP BY r.id;`;
    */

    static addIngredients = "INSERT INTO ingredients (recipe_id, name, quantity) VALUES ?";
    static addInstructions = "INSERT INTO instructions (recipe_id, step_number, description) VALUES ?";
    static addTips = "INSERT INTO tips (recipe_id, description) VALUES ?";
    static addNutritions = "INSERT INTO nutritions (recipe_id, calories, fat, saturated_fat, trans_fat, carbohydrate, fibre, sugar, protein, sodium) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    static addVariations = "INSERT INTO variations (recipe_id, name, description) VALUES ?";
}

module.exports = SqlQuery