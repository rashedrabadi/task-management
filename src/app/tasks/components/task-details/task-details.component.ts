import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../../core/models/task.model';
import { TaskService } from 'src/app/core/services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public task: Task, private taskService: TaskService,
  public dialog: MatDialog,private dialogRef: MatDialogRef<TaskDetailsComponent>) {}
  
  getPriorityColor(priority: string): string {
    if (!priority) {
      return ''; 
    }
  
    switch (priority.toLowerCase()) {
      case 'low': return 'accent';
      case 'medium': return 'primary'; 
      case 'high': return 'warn'; 
      default: return '';
    }
  }
  openEditDialog(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '600px',
      data: { task: this.task }, 
    });

    dialogRef.afterClosed().subscribe(() => {
      this.closeDialog();
    });
  }
  getStatusColor(status: string): string {
    if (!status) {
      return '';  
    }
  
    switch (status.toLowerCase()) {
      case 'active': return 'primary';
      case 'inactive': return 'warn';
      case 'pending': return 'accent';
      default: return '';
    }
  }
  
  closeDialog(): void {
    this.dialogRef.close();
  }
  
}
