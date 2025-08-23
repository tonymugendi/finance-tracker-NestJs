import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionService: TransactionsService) { }

    @Get()
    findAll() {
        return this.transactionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.transactionService.findOne(id);
    }

    @Post()
    create(@Body() createTransactionDto: CreateTransactionDto) {
        return this.transactionService.create(createTransactionDto)
    }

    // @Patch()
    // update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateTransactionDto) {
    //     return this.transactionService.update(id, body)
    // }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        this.transactionService.remove(Number(id))
    }

    @Get('/category/:categoryId')
    findByCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
        return this.transactionService.findByCategory(categoryId);
    }

    @Get('/totals/by-category')
    totalsByCategory() {
        return this.transactionService.totalsByCategory();
    }

    @Get('/summary')
    summary() {
        return this.transactionService.summary();
    }

}
