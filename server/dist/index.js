"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const HelloRes_1 = require("./resolvers/HelloRes");
const RecipeRes_1 = require("./resolvers/RecipeRes");
const typeorm_config_1 = __importDefault(require("./typeorm-config"));
const main = async () => {
    const conn = await (0, typeorm_1.createConnection)(typeorm_config_1.default);
    await conn.runMigrations();
    const app = (0, express_1.default)();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [HelloRes_1.HelloResolver, RecipeRes_1.RecipeResolver],
            validate: false,
        }),
        context: () => ({})
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.listen(4000), () => {
        console.log("Express Server started on localhost:4000");
    };
};
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map