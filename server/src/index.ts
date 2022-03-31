import { ApolloServerPluginLandingPageDisabled, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import { buildSchema } from "type-graphql";
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader";
import { createConnection, getConnection } from "typeorm";
import { COOKIE_NAME, ONE_DAY, __prod__ } from "./consts";
import { HelloResolver } from "./resolvers/HelloRes";
import { RecipeResolver } from "./resolvers/RecipeRes";
import { TagsResolver } from "./resolvers/TagsRes";
import { UserResolver } from "./resolvers/UserRes";
import typeormConfig from "./typeorm-config";
import { ServerContext } from "./types";
import { AuthorsLoader } from './utils/dataLoaders/authorLoader';
import { IngredientsLoader } from './utils/dataLoaders/ingredientLoader';
import { RecipeLoader } from "./utils/dataLoaders/recipeLoader";
import { TagsLoader } from './utils/dataLoaders/tagsLoader';



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
                maxAge: ONE_DAY * 365 * 10, // 10 years 
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
                : ApolloServerPluginLandingPageGraphQLPlayground(),
            ApolloServerLoaderPlugin({
                typeormGetConnection: getConnection,  // for use with TypeORM
            }),
        ],
        schema: await buildSchema({
            resolvers: [HelloResolver, RecipeResolver, UserResolver, TagsResolver],
            validate: false,
        }),
        context: ({ req, res }): ServerContext => ({
            req,
            res,
            recipeLoader: RecipeLoader(),
            authorLoader: AuthorsLoader(),
            ingredientLoader: IngredientsLoader(),
            tagsLoader: TagsLoader()
        })
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