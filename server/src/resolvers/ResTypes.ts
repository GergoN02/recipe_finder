import { InputType, Field } from "type-graphql";

@InputType()
export class RecipeInput {
    @Field()
    recipe_name!: string;

    @Field()
    recipe_desc!: string;

    @Field()
    recipe_cat!: string;

    @Field(() => [String])
    ingredients!: String[];

    @Field(() => [String])
    quantities!: string[];

    @Field()
    recipe_img: string;
}