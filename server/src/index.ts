import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { HelloResolver } from "./resolvers/HelloRes";
import { RecipeResolver } from "./resolvers/RecipeRes";
import { UserResolver } from "./resolvers/UserRes";
import typeormConfig from "./typeorm-config";
import Redis from "ioredis";
import session from "express-session";
import { COOKIE_NAME, __prod__ } from "./env-vars";
import { ServerContext } from "./types";
import cors from "cors";

import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageDisabled } from 'apollo-server-core';


const main = async () => {


    //DB connection with TypeORM
    const conn = await createConnection(typeormConfig);
    //Auto-run all pending migrations
    await conn.runMigrations();

    // const em = conn.createEntityManager();
    // const user = em.create(User, { user_name: "Gergo", password: "123456", user_type: UserType.ADMIN });

    //Express back-end server
    const app = express();

    //Redis Session Store
    const RedisStore = require("connect-redis")(session);
    const redis = new Redis();

    app.use(
        cors({
            origin: "http://localhost:3000",
            credentials: true,
        }))

    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({
                client: redis,
                disableTouch: true
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years 
                httpOnly: true,
                sameSite: "lax", //CSRF
                secure: __prod__
            },
            saveUninitialized: false,
            secret: "random-secret",
            resave: false
        })
    )



    //Apollo GraphQL endpoint
    const apolloServer = new ApolloServer({
        plugins: [ // GraphQL old playground
            process.env.NODE_ENV === 'production'
                ? ApolloServerPluginLandingPageDisabled()
                : ApolloServerPluginLandingPageGraphQLPlayground()
        ],
        schema: await buildSchema({
            resolvers: [HelloResolver, RecipeResolver, UserResolver],
            validate: false,
        }),
        context: ({ req, res }): ServerContext => ({ req, res })
    });

    await apolloServer.start();
    //Listen to GraphQL via express server
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });

    //Express port
    app.listen(4000), () => {
        console.log("Express Server started on localhost:4000")
    };
};

main().catch((err) => {
    console.log(err);
});