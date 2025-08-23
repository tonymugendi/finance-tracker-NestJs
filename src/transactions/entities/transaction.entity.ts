import { Category } from "src/categories/entities/category.entity";
import { ColumnNumericTransformer } from "src/utils/numeric-transformer";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column('decimal', {transformer: new ColumnNumericTransformer()})
    amount: number

    @ManyToOne(() => Category, (category) => category.transactions, {eager: true})
    category: Category;
}