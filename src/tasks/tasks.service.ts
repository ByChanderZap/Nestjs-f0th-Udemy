import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './models/task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dtos/dto/create-task-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getOneTask(id: string): Task {
    const found = this.tasks.findIndex((item) => item.id == id);
    if (found === -1)
      throw new NotFoundException(`We're not able to find that task`);

    return this.tasks.find((task) => task.id === id);
  }

  deleteTask(id: string): boolean {
    const found = this.tasks.findIndex((item) => item.id == id);
    if (found === -1)
      throw new NotFoundException(`We're not able to find that task`);

    this.tasks.splice(found, 1);
    return true;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}
