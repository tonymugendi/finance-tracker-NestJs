import { Category } from "src/categories/entities/category.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column('decimal')
    amount: number

    @ManyToOne(() => Category, (category) => category.transactions, {eager: true})
    category: Category;
}