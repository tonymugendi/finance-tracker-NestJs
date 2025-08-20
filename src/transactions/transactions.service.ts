import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepo: Repository<Transaction>
    ) { }

    // private transactions = [
    //     { id: 1, description: 'Grocery shopping', amount: -50 },
    //     { id: 2, description: 'Salary', amount: 2000 },
    // ]

    findAll() {
        return this.transactionRepo.find()
    }

    findOne(id: number) {
        return this.transactionRepo.findOneBy({ id });
    }

    create(transaction: { description: string; amount: number }) {
       const newTransaction = this.transactionRepo.create(transaction);
       return this.transactionRepo.save(newTransaction)
    }

    // update(id: number, updateData: { description?: string; amount?: number }) {
    //     const transaction = this.transactions.find(tx => tx.id === id);

    //     if (!transaction) return null;

    //     Object.assign(transaction, updateData);
    //     return transaction;

    // }

    async remove(id: number) {
        const result = await this.transactionRepo.delete(id);
        return result.affected ? true : false;
    }
}
