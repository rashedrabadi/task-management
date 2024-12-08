import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Task } from '../../../core/models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Input() title: string = '';
  @Input() fromAll: boolean = false; 
  @Output() taskDropped = new EventEmitter<CdkDragDrop<Task[]>>();
  isTasksRoute: boolean=false;
  constructor(private dialog: MatDialog,private router: Router) { 
    this.checkIfTasksRoute();
  }
  onDrop(event: CdkDragDrop<Task[]>) {
    this.taskDropped.emit(event);
  }
  checkIfTasksRoute(): void {
    const urlSegments = this.router.url.split('/');
    this.isTasksRoute = urlSegments.includes('tasks');
  }
  openTaskDetails(task: Task) {
    if(this.isTasksRoute){
      this.router.navigate([`/tasks/${task.id}`]);
    }
    else {
      this.dialog.open(TaskDetailsComponent, {
        data: task, 
        width: '600px', 
      });
    }
   
  }
  
}
