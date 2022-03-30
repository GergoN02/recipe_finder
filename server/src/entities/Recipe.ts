import { Ctx, Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ServerContext } from "../types";
import { RecipeTags } from "./RecipeTags";
import { Tag } from "./Tag";
import { UserSavedRecipes } from "./UserSavedRecipe";


@ObjectType() // For type-graphql API
@Entity() // For TypeORM
export class Recipe extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    recipe_author!: number;

    @Field()
    @Column()
    recipe_name!: string;

    @Field()
    @Column()
    recipe_desc!: string;

    @Field(() => [String])
    @Column("text", { array: true })
    ingredients!: String[];

    @Field(() => [String])
    @Column("text", { array: true })
    quantities!: string[];

    @Field()
    @Column({ nullable: true })
    recipe_img?: string;

    @Field()
    @CreateDateColumn()
    created_at!: Date

    @Field()
    @UpdateDateColumn()
    updated_at!: Date

    @OneToMany(() => UserSavedRecipes, ur => ur.recipe)
    userConnection: Promise<UserSavedRecipes[]>

    @OneToMany(() => RecipeTags, rt => rt.tag)
    tagConnection: Promise<RecipeTags[]>

    @Field(() => [Tag], { nullable: true })
    async recipeTags(@Ctx() { tagsLoader }: ServerContext): Promise<Tag[]> {
        return tagsLoader!.load(this.id);
    }

}