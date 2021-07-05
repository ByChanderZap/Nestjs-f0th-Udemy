import { IsEnum } from 'class-validator';
import { TaskStatus } from '../../models/task-status.enum';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
