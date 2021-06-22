import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dtos/dto/create-task-dto';
import { Task } from './models/task.model';

import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    const task = this.taskService.getOneTask(id);
    return task;
  }

  @Delete('/:id')
  deleteOneTask(@Param('id') id: string): any {
    this.taskService.deleteTask(id);
    return {
      Message: `Task ${id} deleted`,
    };
  }

  @Post()
  createTask(@Body() createTaskDt: CreateTaskDto): Task {
    const created: Task = this.taskService.createTask(createTaskDt);
    return created;
  }
}
