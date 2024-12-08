import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from 'src/app/core/services/task.service';
import { UserService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  dummyUsers: string[] = [];
  today: string = new Date().toISOString().split('T')[0]; 
  subbed: boolean = false;
  newTask: any = {};

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task | null },
    private userService: UserService
  ) { 
    this.userService.users$.subscribe((users) => {
      this.dummyUsers = users;
    });
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      priority: ['Medium', Validators.required],
      status: ['Pending', Validators.required],
      assignedTo: ['', Validators.required],
      dueDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data.task) {
      this.newTask = { ...this.data.task };
      this.setFormValues();
    }
  }

  setFormValues(): void {
    if (this.newTask) {
      this.taskForm.patchValue({
        name: this.newTask.name,
        description: this.newTask.description,
        priority: this.newTask.priority,
        status: this.newTask.status,
        assignedTo: this.newTask.assignedTo,
        dueDate: this.newTask.dueDate,
      });
    }
  }

  onSubmit(): void {
    this.subbed = true;
    if (this.taskForm.valid) {
      this.newTask = { ...this.newTask, ...this.taskForm.value };
      if (this.newTask.id) {
        this.taskService.updateTask(this.newTask);
      } else {
        this.taskService.addTask(this.newTask);
      }

      this.dialogRef.close();
    } else {
      console.log('Form is invalid');
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
