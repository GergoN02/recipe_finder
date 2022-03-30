import { Request, Response } from "express";
import { RecipeLoader } from "./utils/recipeLoader";
import { TagsLoader } from "./utils/tagsLoader";

export type ServerContext = {
    req: Request; // Session cannot be undefined
    res: Response;
    recipeLoader?: ReturnType<typeof RecipeLoader>;
    tagsLoader?: ReturnType<typeof TagsLoader>;
};


export type Lazy<T> = Promise<T> | T;