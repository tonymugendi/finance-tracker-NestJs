import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './create-transaction.dto';
import { UpdateTransactionDto } from './update-transaction.dto';

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
    create(@Body() createTransactionDto: CreateTransactionDto) {
        return this.transactionService.create(createTransactionDto)
    }

    @Patch()
    update(@Param('id') id: string, @Body() body: UpdateTransactionDto) {
        return this.transactionService.update(Number(id), body)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        this.transactionService.remove(Number(id))
    }

}
