"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Recipe_1 = require("../entities/Recipe");
const ResTypes_1 = require("./ResTypes");
let RecipeResolver = class RecipeResolver {
    async getRecipes() {
        return Recipe_1.Recipe.find();
    }
    async getOneRecipe(id) {
        return Recipe_1.Recipe.findOne(id);
    }
    async addRecipe(recipe_input) {
        return Recipe_1.Recipe.create(recipe_input).save();
    }
    async updateRecipe(id, recipe_input) {
        const recipe = await Recipe_1.Recipe.findOne(id);
        if (!recipe) {
            return undefined;
        }
        Object.assign(recipe, recipe_input);
        await recipe.save();
        return recipe;
    }
    async deleteRecipe(id) {
        await Recipe_1.Recipe.delete(id);
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Recipe_1.Recipe]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipeResolver.prototype, "getRecipes", null);
__decorate([
    (0, type_graphql_1.Query)(() => Recipe_1.Recipe, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RecipeResolver.prototype, "getOneRecipe", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Recipe_1.Recipe),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ResTypes_1.RecipeInput]),
    __metadata("design:returntype", Promise)
], RecipeResolver.prototype, "addRecipe", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Recipe_1.Recipe),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ResTypes_1.RecipeInput]),
    __metadata("design:returntype", Promise)
], RecipeResolver.prototype, "updateRecipe", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Recipe_1.Recipe),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RecipeResolver.prototype, "deleteRecipe", null);
RecipeResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], RecipeResolver);
exports.RecipeResolver = RecipeResolver;
//# sourceMappingURL=RecipeRes.js.map