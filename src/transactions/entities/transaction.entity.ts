import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column('decimal')
    amount: number


}