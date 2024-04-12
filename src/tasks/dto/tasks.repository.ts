import { DataSource, Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { CreateTaskDto } from './create-task.dto';
import { TaskStatus } from '../task-status.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class TasksRepository extends Repository<TaskEntity> {
  constructor(private dataSource: DataSource) {
    super(TaskEntity, dataSource.createEntityManager());
  }

  async getTaskById(id: string): Promise<TaskEntity> {
    return this.findOneBy({
      id: id,
    });
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    await this.delete(id);
  }
}
