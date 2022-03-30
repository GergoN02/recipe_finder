import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RecipeDiet } from "./RecipeDiet";


@ObjectType()
@Entity()
export class Diet extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column({ unique: true })
    diet_name!: string;

    @Field(() => String)
    @Column({ nullable: true })
    diet_desc?: string;

    @OneToMany(() => RecipeDiet, rd => rd.recipe)
    recipeConnection: Promise<RecipeDiet[]>;
}
