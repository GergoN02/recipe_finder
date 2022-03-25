import { Request, Response } from "express";
import { createRecipeLoader } from "./resolvers/utils/recipeLoader";

export type ServerContext = {
    req: Request; // Session cannot be undefined
    res: Response;
    recipeLoader: ReturnType<typeof createRecipeLoader>;
};