import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import TasksRepository from './dto/tasks.repository';
import { TaskEntity } from './dto/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, TasksRepository])],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository, TaskEntity],
})
export class TasksModule {}
