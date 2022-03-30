import { Request, Response } from "express";
import { CategoryLoader } from "./utils/categoryLoader";
import { dietLoader } from "./utils/dietLoader";
import { RecipeLoader } from "./utils/recipeLoader";

export type ServerContext = {
    req: Request; // Session cannot be undefined
    res: Response;
    recipeLoader?: ReturnType<typeof RecipeLoader>;
    categoryLoader?: ReturnType<typeof CategoryLoader>;
    dietLoader?: ReturnType<typeof dietLoader>
};