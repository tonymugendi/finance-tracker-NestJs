import { Transaction } from "src/transactions/entities/transaction.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @Column({nullable: true})
    description: string

    @OneToMany(() => Transaction, (transaction) => transaction.category)
    transactions: Transaction[]
}



