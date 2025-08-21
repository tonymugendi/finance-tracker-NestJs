import { IsString, IsNumber } from "class-validator";


export class CreateTransactionDto {
    @IsString()
    description: string

    @IsNumber()
    amount: number
    categoryId: number
}