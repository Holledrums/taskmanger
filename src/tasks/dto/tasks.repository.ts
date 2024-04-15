import { DataSource, Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { CreateTaskDto } from './create-task.dto';
import { TaskStatus } from '../task-status.enum';
import { Injectable } from '@nestjs/common';
import { GetTasksFilterDto } from './get-tasks-filter.dto';

@Injectable()
export default class TasksRepository extends Repository<TaskEntity> {
  constructor(private dataSource: DataSource) {
    super(TaskEntity, dataSource.createEntityManager());
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<TaskEntity[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
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
}
