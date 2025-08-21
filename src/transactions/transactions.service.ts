import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { Category } from 'src/categories/entities/category.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepo: Repository<Transaction>,

        @InjectRepository(Category)
        private readonly categoryRepo: Repository<Category>
    ) { }

    findAll() {
        return this.transactionRepo.find()
    }

    findOne(id: number) {
        return this.transactionRepo.findOneBy({ id });
    }

    async create(transactionDto: CreateTransactionDto) {

        const category = await this.categoryRepo.findOneBy({id: transactionDto.categoryId});
        if (!category) {
            throw new NotFoundException('Category not found')
        }

        const newTransaction = this.transactionRepo.create({
            description: transactionDto.description,
            amount: transactionDto.amount,
            category
        });

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
