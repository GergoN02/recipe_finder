import { Request, Response } from "express";
import { RecipeLoader } from "./utils/recipeLoader";

export type ServerContext = {
    req: Request; // Session cannot be undefined
    res: Response;
    recipeLoader?: ReturnType<typeof RecipeLoader>;
};