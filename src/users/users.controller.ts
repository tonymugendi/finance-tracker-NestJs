import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from "bcrypt";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('register')
    async register(@Body() body: CreateUserDto) {
        const hashedPass = await bcrypt.hash(body.password, 10);
        const user = await this.usersService.create(body.email, hashedPass);
        return { id: user?.id, email: user?.email }
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id)

    }


}
