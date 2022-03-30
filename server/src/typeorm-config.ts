import path from "path";
import { ConnectionOptions } from "typeorm";
import { Category } from "./entities/Category";
import { Diet } from "./entities/Diet";
import { Recipe } from "./entities/Recipe";
import { RecipeCategory } from "./entities/RecipeCategory";
import { RecipeDiet } from "./entities/RecipeDiet";
import { User } from "./entities/User";
import { UserSavedRecipes } from "./entities/UserSavedRecipe";

export default {
    type: "postgres",
    database: "recipes_db",
    username: "postgres",
    password: "postgres",
    synchronize: false,
    entities: [User, Recipe, UserSavedRecipes, Category, Diet, RecipeCategory, RecipeDiet],
    migrations: [path.join(__dirname, "./entities/migrations/*.js")],
    cli: {
        "migrationsDir": path.join(__dirname, "./entities/migrations")
    }
} as ConnectionOptions;
