import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionService: TransactionsService) { }

    @Get()
    findAll() {
        return this.transactionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.transactionService.findOne(Number(id));
    }

    @Post()
    create(@Body() body: {description: string; amount: number}) {
        return this.transactionService.create(body)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        this.transactionService.remove(Number(id))
    }

}
