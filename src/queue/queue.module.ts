import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';
import { Queue } from './models/queue.model';

@Module({
  imports: [SequelizeModule.forFeature([Queue]), JwtModule],
  controllers: [QueueController],
  providers: [QueueService],
})
export class QueueModule {}
