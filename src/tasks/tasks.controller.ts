import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dtos/dto/create-task-dto';
import { GetTasksFilterDto } from './dtos/dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './models/task.model';

import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    // If we have any filters defined, call taskService.getTasksWithFilters
    // otherwise just get all tasks

    if (Object.keys(filterDto).length) {
      return this.taskService.getTasksWithFilters(filterDto);
    } else {
      return this.taskService.getAllTasks();
    }
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

  @Patch('/:id/status')
  udateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.taskService.updateTaskStatus(id, status);
  }
}
