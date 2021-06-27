import { TaskStatus } from 'src/tasks/models/task.model';

export class GetTasksFilterDto {
  status?: TaskStatus;
  search?: string;
}
