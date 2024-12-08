import { Component } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Task } from '../core/models/task.model';
import { TaskService } from '../core/services/task.service';
import { TaskFormComponent } from '../tasks/components/task-form/task-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  tasks: Task[] = []; 
  showTaskForm = false;
  constructor(private taskService: TaskService,private dialog: MatDialog,private router: Router) {
    this.taskService.taskStatus$.subscribe(tasks => {
      this.tasks = tasks; 
    });
  }
  onTaskCreated(newTask: Task) {
    this.tasks.push(newTask);
    this.showTaskForm = false; 
  }
  openTaskFormDialog(): void {
    
    this.dialog.open(TaskFormComponent, {
      width: '600px',   
      data: {}          
    });
  }
  getTasksByStatus(status: 'Pending' | 'In Progress' | 'Completed'): Task[] {
    return this.tasks.filter(task => task.status === status);
  }
  onTaskDropped(event: CdkDragDrop<Task[]>) {
    const task = event.item.data;
    let newStatus: "Pending" | "In Progress" | "Completed";

    if (event.container.id === 'cdk-drop-list-0') {
      newStatus = 'Pending';
    } else if (event.container.id === 'cdk-drop-list-1') {
      newStatus = 'In Progress';
    } else if (event.container.id === 'cdk-drop-list-2') {
      newStatus = 'Completed';
    } else {
      newStatus = 'Pending';
    }

    this.taskService.moveTask(task, newStatus);

    event.container.data.push(task);
    event.previousContainer.data.splice(event.previousContainer.data.indexOf(task), 1);
  }



  updateArrayTaskStatus(taskArray: Task[], taskId: string, newStatus: 'Pending' | 'In Progress' | 'Completed') {
    const task = taskArray.find(t => t.id === taskId);
    if (task) {
      task.status = newStatus;
    }
  }
}
