import { Request, Response } from "express";

export type ServerContext = {
    req: Request; // Session cannot be undefined
    res: Response;
};