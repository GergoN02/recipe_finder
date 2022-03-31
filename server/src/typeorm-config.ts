import path from "path";
import { ConnectionOptions } from "typeorm";
import { Tag } from "./entities/Tag";
import { Recipe } from "./entities/Recipe";
import { User } from "./entities/User";
import { UserSavedRecipes } from "./entities/joinTables/UserSavedRecipe";
import { RecipeTags } from "./entities/joinTables/RecipeTags";
import { RecipeAuthors } from "./entities/joinTables/RecipeAuthor";
import { Ingredient } from "./entities/Ingredient";
import { RecipeIngredients } from "./entities/joinTables/RecipeIngredients";

export default {
    type: "postgres",
    database: "recipes_db",
    username: "postgres",
    password: "postgres",
    synchronize: false,
    entities: [
        User,
        Recipe,
        UserSavedRecipes,
        RecipeAuthors,
        Ingredient,
        RecipeIngredients,
        Tag,
        RecipeTags
    ],
    migrations: [path.join(__dirname, "./entities/migrations/*.js")],
    cli: {
        "migrationsDir": path.join(__dirname, "./entities/migrations")
    }
} as ConnectionOptions;
