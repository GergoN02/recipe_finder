"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const Recipe_1 = require("./entities/Recipe");
const User_1 = require("./entities/User");
exports.default = {
    type: "postgres",
    database: "recipe-db",
    username: "postgres",
    password: "postgres",
    synchronize: false,
    entities: [User_1.User, Recipe_1.Recipe],
    migrations: [path_1.default.join(__dirname, "./entities/migrations/*.js")],
    cli: {
        "migrationsDir": path_1.default.join(__dirname, "./entities/migrations")
    }
};
//# sourceMappingURL=typeorm-config.js.map