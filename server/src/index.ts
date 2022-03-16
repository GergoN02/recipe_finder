import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { HelloResolver } from "./resolvers/HelloRes";
import { RecipeResolver } from "./resolvers/RecipeRes";
import typeormConfig from "./typeorm-config";


const main = async () => {


    //DB connection with TypeORM
    const conn = await createConnection(typeormConfig);
    //Auto-run all pending migrations
    await conn.runMigrations();

    // const em = conn.createEntityManager();
    // const user = em.create(User, { user_name: "Gergo", password: "123456", user_type: UserType.ADMIN });

    //Express back-end server
    const app = express();

    //Apollo GraphQL endpoint
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, RecipeResolver],
            validate: false,
        }),
        context: () => ({})
    });

    await apolloServer.start();
    //Listen to GraphQL via express server
    apolloServer.applyMiddleware({ app });

    //Express port
    app.listen(4000), () => {
        console.log("Express Server started on localhost:4000")
    };
};

main().catch((err) => {
    console.log(err);
});