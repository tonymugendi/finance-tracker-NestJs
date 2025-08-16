import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionsService {
    private transactions = [
        { id: 1, description: 'Grocery shopping', amount: -50 },
        { id: 2, description: 'Salary', amount: 2000 },
    ]

    findAll() {
        return this.transactions
    }

    findOne(id: number) {
        return this.transactions.find(tx => tx.id === id);
    }

    create(transaction: {description: string; amount: number}) {
        const newTransaction = {
            id: this.transactions.length + 1,
            ...transaction
        };

        this.transactions.push(newTransaction);
        return newTransaction;
    }

    remove(id: number) {
        const index = this.transactions.findIndex(tx => tx.id === id);
        if(index === -1) return null;
        const removed = this.transactions.splice(index, 1);
        return removed[0]
    }
}
