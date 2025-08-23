import { Type } from "class-transformer";
import { IsString, IsNumber, IsNotEmpty, IsInt } from "class-validator";


export class CreateTransactionDto {
    @IsString()
    @IsNotEmpty()
    description: string

    @Type(() => Number)
    @IsNumber()
    amount: number

    @Type(() => Number)
    @IsInt()
    categoryId: number
}