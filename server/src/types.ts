import { Request, Response } from "express";
import { RecipeLoader } from "./utils/dataLoaders/recipeLoader";
import { TagsLoader } from "./utils/dataLoaders/tagsLoader";
import { AuthorsLoader } from "./utils/dataLoaders/authorLoader"
import { IngredientsLoader } from "./utils/dataLoaders/ingredientLoader";

export type ServerContext = {
    req: Request; // Session cannot be undefined
    res: Response;
    recipeLoader?: ReturnType<typeof RecipeLoader>;
    authorLoader?: ReturnType<typeof AuthorsLoader>;
    ingredientLoader?: ReturnType<typeof IngredientsLoader>;
    tagsLoader?: ReturnType<typeof TagsLoader>;
};


export type Lazy<T> = Promise<T> | T;