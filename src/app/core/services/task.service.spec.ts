import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { Task } from '../../core/models/task.model';
import { BehaviorSubject } from 'rxjs';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new task', () => {
    const newTask: Task = {
      id: '36',
      name: 'Task 36',
      description: 'Description for Task 36',
      priority: 'Low',
      status: 'Pending',
      assignedTo: 'Michael',
      dueDate: new Date(),
    };

    service.addTask(newTask);

    service.taskStatus$.subscribe((tasks) => {
      const addedTask = tasks.find((task) => task.id === '36');
      expect(addedTask).toBeTruthy();
      expect(addedTask?.name).toBe('Task 36');
    });
  });

  it('should update task status', () => {
    const taskId = '1';
    const newStatus: any = 'Completed';

    service.updateTaskStatus(taskId, newStatus);

    service.taskStatus$.subscribe((tasks) => {
      const updatedTask = tasks.find((task) => task.id === taskId);
      expect(updatedTask).toBeTruthy();
      expect(updatedTask?.status).toBe(newStatus);
    });
  });

  it('should delete a task', () => {
    const taskId = '2';

    service.deleteTask(taskId);

    service.taskStatus$.subscribe((tasks) => {
      const deletedTask = tasks.find((task) => task.id === taskId);
      expect(deletedTask).toBeUndefined();
    });
  });
});
