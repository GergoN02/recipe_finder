import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RecipeSteps } from "./joinTables/RecipeSteps";


@ObjectType()
@Entity()
export class Step extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => Number)
    @Column({ nullable: true })
    step_number!: number;

    @Field(() => String)
    @Column({ nullable: true })
    step_desc?: string;

    @OneToMany(() => RecipeSteps, rs => rs.step)
    recipeStepConnection: Promise<RecipeSteps[]>
}
