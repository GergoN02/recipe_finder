import { Request, Response } from "express";
import { Redis } from "ioredis";
import { RecipeLoader } from "./utils/dataLoaders/recipeLoader";
import { TagsLoader } from "./utils/dataLoaders/tagsLoader";

export type ServerContext = {
    req: Request & { session: Express.Session }; // Session cannot be undefined
    res: Response;
    redis: Redis;
    recipeLoader?: ReturnType<typeof RecipeLoader>;
    tagsLoader?: ReturnType<typeof TagsLoader>;
};


export type Lazy<T> = Promise<T> | T;