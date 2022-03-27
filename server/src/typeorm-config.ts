import path from "path";
import { ConnectionOptions } from "typeorm";
import { Category } from "./entities/Category";
import { Cuisine } from "./entities/Cuisine";
import { Diet } from "./entities/Diet";
import { Recipe } from "./entities/Recipe";
import { User } from "./entities/User";
import { UserSavedRecipes } from "./entities/UserSavedRecipe";


export default {
    type: "postgres",
    database: "recipe-db",
    username: "postgres",
    password: "postgres",
    synchronize: false,
    entities: [User, Recipe, UserSavedRecipes, Cuisine, Category, Diet],
    migrations: [path.join(__dirname, "./entities/migrations/*.js")],
    cli: {
        "migrationsDir": path.join(__dirname, "./entities/migrations")
    }
} as ConnectionOptions;
