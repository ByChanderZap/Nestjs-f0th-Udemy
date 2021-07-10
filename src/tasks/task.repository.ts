import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/dto/create-task-dto';
import { TaskStatus } from './models/task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    // Here we just create like a task entity we have to save it later
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task); // Here we actually save the task
    return task;
  }
}
