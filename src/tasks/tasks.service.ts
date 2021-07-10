import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './models/task-status.enum';
import { Task } from './task.entity';
import { CreateTaskDto } from './dtos/dto/create-task-dto';
import { GetTasksFilterDto } from './dtos/dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  /*
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
  */

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found)
      throw new NotFoundException(`We're not able to find ${id} task`);
    return found;
  }

  async deleteTask(id: string): Promise<any> {
    const deleted = await this.taskRepository.delete(id);
    if (deleted.affected === 0)
      throw new NotFoundException(`We're not able to find ${id} task`);

    return {
      Message: 'Task successfully deleted',
    };
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }
  /*

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getOneTask(id);
    task.status = status;
    return task;
  }
  */
}
