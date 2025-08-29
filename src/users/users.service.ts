import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>
    ) { }


    async findByemail(email: string): Promise<User | null> {
        return this.usersRepo.findOne({ where: { email } })
    }

    async create(email: string, passwordHash: string): Promise<User | null> {
        const newUser = this.usersRepo.create({ email, passwordHash });

        return this.usersRepo.save(newUser);
    }

    async findOne(id: number): Promise<User> {
        const user = await this.usersRepo.findOne({ where: { id } })
        if(!user) throw new NotFoundException(`User ${id} not found`)
        return user
    }
}
