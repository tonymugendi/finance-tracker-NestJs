import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [TransactionsModule, ConfigModule.forRoot({
    isGlobal: true
  }) ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
