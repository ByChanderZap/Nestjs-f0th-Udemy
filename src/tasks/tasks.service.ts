import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './models/task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dtos/dto/create-task-dto';
import { GetTasksFilterDto } from './dtos/dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    // Do something with status
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    // Do something with search
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    // return everything
    return tasks;
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

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getOneTask(id);
    task.status = status;
    return task;
  }
}
