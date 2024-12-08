import { Component, OnInit } from '@angular/core';
import { TaskFormComponent } from '../tasks/components/task-form/task-form.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../core/services/task.service';
import { Task } from '../core/models/task.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-backlog',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.scss']
})
export class AllTasksComponent {

  tasks: Task[] = []; 
  showTaskForm = false;
  constructor(private taskService: TaskService,private dialog: MatDialog,private router:Router) {
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
  navigateToAddTask(): void {
    this.router.navigate(['/tasks/add']);
  }



  updateArrayTaskStatus(taskArray: Task[], taskId: string, newStatus: 'Pending' | 'In Progress' | 'Completed') {
    const task = taskArray.find(t => t.id === taskId);
    if (task) {
      task.status = newStatus;
    }
  }

}
