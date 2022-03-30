import { Field, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RecipeCategory } from "./RecipeCategory";


@ObjectType()
@Entity()
export class Category extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column({ unique: true })
    category_name!: string;

    @Field(() => String)
    @Column({ nullable: true })
    category_desc?: string;

    @OneToMany(() => RecipeCategory, rc => rc.recipe)
    @TypeormLoader()
    recipeConnection: Promise<RecipeCategory[]>;
}
