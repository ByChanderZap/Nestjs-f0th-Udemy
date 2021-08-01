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
import { UpdateTaskStatusDto } from './dtos/dto/update-task-status.dto';
import { Task } from './task.entity';

import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskService.getTasks(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    const task = this.taskService.getTaskById(id);
    return task;
  }

  @Delete('/:id')
  deleteOneTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }

  @Post()
  createTask(@Body() createTaskDt: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDt);
  }

  @Patch('/:id/status')
  udateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTaskStatus(id, status);
  }
}
