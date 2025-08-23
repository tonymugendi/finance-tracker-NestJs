import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { Category } from 'src/categories/entities/category.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

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

    async findOne(id: number) {
        const transaction = await this.transactionRepo.findOneBy({ id });
        if (!transaction) throw new NotFoundException(`Transaction ${id} not found`)

        return transaction
    }

    async create(transactionDto: CreateTransactionDto) {

        const category = await this.categoryRepo.findOneBy({ id: transactionDto.categoryId });
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

    // async update(id: number, dto: UpdateTransactionDto) {
    //     const tx = this.transactionRepo.findOneBy({ id: dto.categoryId });

    //     // Handle category change if provided
    //     if (dto.categoryId !== undefined) {
    //         const category = await this.categoryRepo.findOneBy({ id: dto.categoryId });
    //         if (!category) throw new NotFoundException('Category not found');
    //         tx.category = category;
    //     }

    //     if (dto.description !== undefined) tx.description = dto.description;
    //     if (dto.amount !== undefined) tx.amount = dto.amount;

    //     return this.transactionRepo.save(tx);
    // }

    async remove(id: number) {
        const result = await this.transactionRepo.delete(id);
        if (!result.affected) {
            throw new NotFoundException(`Transaction ${id} not found`)
        }
        return true;
    }


    async findByCategory(categoryId: number) {
        return this.transactionRepo.find({
            where: { category: { id: categoryId } },
            relations: ['category']
        })
    }

    async totalsByCategory() {
        const rows = await this.transactionRepo
            .createQueryBuilder('transaction')
            .leftJoin('transaction.category', 'category')
            .select('category.name', 'category')
            .addSelect('SUM(transaction.amount)', 'total')
            .groupBy('category.name')
            .getRawMany();

        return rows.map(r => ({
            category: r.category,
            total: parseFloat(r.total) || 0
        }))
    }

    async summary() {
        const raw = await this.transactionRepo
        .createQueryBuilder('t')
        .select('SUM(CASE WHEN t.amount > 0 THEN t.amount ELSE 0 END)', 'income')
        .addSelect('SUM(CASE WHEN t.amount < 0 THEN t.amount ELSE 0 END)', 'expense')
        .getRawOne();
      
      const income = parseFloat(raw.income) || 0;
      const expense = parseFloat(raw.expense) || 0;
      return { income, expense, balance: income + expense };
      
    }


}
