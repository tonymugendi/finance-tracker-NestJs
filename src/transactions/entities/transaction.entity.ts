import { Category } from "src/categories/entities/category.entity";
import { User } from "src/users/entities/user.entity";
import { ColumnNumericTransformer } from "src/utils/numeric-transformer";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column('decimal', { transformer: new ColumnNumericTransformer() })
    amount: number

    @ManyToOne(() => User, user => user.transactions, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Category, (category) => category.transactions, { eager: true })
    category: Category;
}