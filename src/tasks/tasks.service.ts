
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {

  private tabTasks = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
      createdAt: new Date(),
    },
  ];

  private nextId = 2;

  // GET ALL TASKS
  findAll() {
    return this.tabTasks;
  }

  // GET TASK BY ID
  findOne(id: number) {
    const task = this.tabTasks.find(
      (task) => task.id === id,
    );

    if (!task) {
      throw new NotFoundException(
        `Task with ID ${id} not found`,
      );
    }

    return task;
  }

  // CREATE TASK
  create(createTaskDto: CreateTaskDto) {
    const newTask = {
      id: this.nextId++,
      ...createTaskDto,
      createdAt: new Date(),
    };

    this.tabTasks.push(newTask);

    return newTask;
  }

  // UPDATE TASK
  update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = this.findOne(id);

    Object.assign(task, updateTaskDto);

    return task;
  }

  // DELETE TASK
  remove(id: number) {
    const index = this.tabTasks.findIndex(
      (task) => task.id === id,
    );

    if (index === -1) {
      throw new NotFoundException(
        `Task with ID ${id} not found`,
      );
    }

    const deletedTask = this.tabTasks[index];

    this.tabTasks.splice(index, 1);

    return {
      message: 'Task deleted successfully',
      task: deletedTask,
    };
  }
}