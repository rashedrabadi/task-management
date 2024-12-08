import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Task } from '../../core/models/task.model';

type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
    private tasks: Task[] = [
        { id: '1', name: 'Task 1', description: 'Description for Task 1', priority: 'High', status: 'Pending', assignedTo: 'John', dueDate: new Date() },
        { id: '2', name: 'Task 2', description: 'Description for Task 2', priority: 'Medium', status: 'Pending', assignedTo: 'Jane', dueDate: new Date() },
        { id: '3', name: 'Task 3', description: 'Description for Task 3', priority: 'Low', status: 'In Progress', assignedTo: 'Doe', dueDate: new Date() },
        { id: '4', name: 'Task 4', description: 'Description for Task 4', priority: 'Medium', status: 'Completed', assignedTo: 'Smith', dueDate: new Date() },
        { id: '5', name: 'Task 5', description: 'Description for Task 5', priority: 'High', status: 'Pending', assignedTo: 'John', dueDate: new Date() },
        { id: '6', name: 'Task 6', description: 'Description for Task 6', priority: 'Medium', status: 'In Progress', assignedTo: 'Jane', dueDate: new Date() },
        { id: '7', name: 'Task 7', description: 'Description for Task 7', priority: 'Low', status: 'Pending', assignedTo: 'Doe', dueDate: new Date() },
        { id: '8', name: 'Task 8', description: 'Description for Task 8', priority: 'High', status: 'Completed', assignedTo: 'Smith', dueDate: new Date() },
        { id: '9', name: 'Task 9', description: 'Description for Task 9', priority: 'Medium', status: 'In Progress', assignedTo: 'Emily', dueDate: new Date() },
        { id: '10', name: 'Task 10', description: 'Description for Task 10', priority: 'Low', status: 'Pending', assignedTo: 'Michael', dueDate: new Date() },
        { id: '11', name: 'Task 11', description: 'Description for Task 11', priority: 'High', status: 'In Progress', assignedTo: 'John', dueDate: new Date() },
        { id: '12', name: 'Task 12', description: 'Description for Task 12', priority: 'Medium', status: 'Completed', assignedTo: 'Jane', dueDate: new Date() },
        { id: '13', name: 'Task 13', description: 'Description for Task 13', priority: 'Low', status: 'Pending', assignedTo: 'Doe', dueDate: new Date() },
        { id: '14', name: 'Task 14', description: 'Description for Task 14', priority: 'High', status: 'In Progress', assignedTo: 'Smith', dueDate: new Date() },
        { id: '15', name: 'Task 15', description: 'Description for Task 15', priority: 'Medium', status: 'Completed', assignedTo: 'Emily', dueDate: new Date() },
        { id: '16', name: 'Task 16', description: 'Description for Task 16', priority: 'Low', status: 'Pending', assignedTo: 'Michael', dueDate: new Date() },
        { id: '17', name: 'Task 17', description: 'Description for Task 17', priority: 'High', status: 'Completed', assignedTo: 'John', dueDate: new Date() },
        { id: '18', name: 'Task 18', description: 'Description for Task 18', priority: 'Medium', status: 'In Progress', assignedTo: 'Jane', dueDate: new Date() },
        { id: '19', name: 'Task 19', description: 'Description for Task 19', priority: 'Low', status: 'Pending', assignedTo: 'Doe', dueDate: new Date() },
        { id: '20', name: 'Task 20', description: 'Description for Task 20', priority: 'High', status: 'Completed', assignedTo: 'Smith', dueDate: new Date() },
        { id: '21', name: 'Task 21', description: 'Description for Task 21', priority: 'Medium', status: 'In Progress', assignedTo: 'Emily', dueDate: new Date() },
        { id: '22', name: 'Task 22', description: 'Description for Task 22', priority: 'Low', status: 'Pending', assignedTo: 'Michael', dueDate: new Date() },
        { id: '23', name: 'Task 23', description: 'Description for Task 23', priority: 'High', status: 'In Progress', assignedTo: 'John', dueDate: new Date() },
        { id: '24', name: 'Task 24', description: 'Description for Task 24', priority: 'Medium', status: 'Completed', assignedTo: 'Jane', dueDate: new Date() },
        { id: '25', name: 'Task 25', description: 'Description for Task 25', priority: 'Low', status: 'Pending', assignedTo: 'Doe', dueDate: new Date() },
        { id: '26', name: 'Task 26', description: 'Description for Task 26', priority: 'High', status: 'In Progress', assignedTo: 'Smith', dueDate: new Date() },
        { id: '27', name: 'Task 27', description: 'Description for Task 27', priority: 'Medium', status: 'Completed', assignedTo: 'Emily', dueDate: new Date() },
        { id: '28', name: 'Task 28', description: 'Description for Task 28', priority: 'Low', status: 'Pending', assignedTo: 'Michael', dueDate: new Date() },
        { id: '29', name: 'Task 29', description: 'Description for Task 29', priority: 'High', status: 'Completed', assignedTo: 'John', dueDate: new Date() },
        { id: '30', name: 'Task 30', description: 'Description for Task 30', priority: 'Medium', status: 'In Progress', assignedTo: 'Jane', dueDate: new Date() },
        { id: '31', name: 'Task 31', description: 'Description for Task 31', priority: 'Low', status: 'Pending', assignedTo: 'Doe', dueDate: new Date() },
        { id: '32', name: 'Task 32', description: 'Description for Task 32', priority: 'High', status: 'In Progress', assignedTo: 'Smith', dueDate: new Date() },
        { id: '33', name: 'Task 33', description: 'Description for Task 33', priority: 'Medium', status: 'Completed', assignedTo: 'Emily', dueDate: new Date() },
        { id: '34', name: 'Task 34', description: 'Description for Task 34', priority: 'Low', status: 'Pending', assignedTo: 'Michael', dueDate: new Date() },
        { id: '35', name: 'Task 35', description: 'Description for Task 35', priority: 'High', status: 'In Progress', assignedTo: 'John', dueDate: new Date() }
      ];
      

  private taskStatusSubject = new BehaviorSubject<Task[]>(this.tasks);
  
  taskStatus$ = this.taskStatusSubject.asObservable();

  constructor() {}

  updateTaskStatus(taskId: string, newStatus: TaskStatus): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.status = newStatus; 
      this.taskStatusSubject.next([...this.tasks]); 
    }
  }
  addTask(newTask: Task): void {
    newTask.id = (this.tasks.length + 1).toString(); 
    this.tasks.push(newTask); 
    this.taskStatusSubject.next([...this.tasks]); 
  }
  moveTask(task: Task, newStatus: TaskStatus): void {
    this.updateTaskStatus(task.id, newStatus); 
  }
  getTaskById(id: string): Observable<Task | null> {
    return this.taskStatus$.pipe(
      map((tasks) => tasks.find((task) => task.id === id) || null)
    );
  }
  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.taskStatusSubject.next(this.tasks);
    }
    
  }
  deleteTask(taskId: string): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.taskStatusSubject.next(this.tasks);
  }
}
