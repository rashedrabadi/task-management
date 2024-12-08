import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/core/services/task.service';
import { Task } from 'src/app/core/models/task.model';
import { UserService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.scss'],
})
export class AddEditTaskComponent implements OnInit {
  taskForm: FormGroup;
  dummyUsers: string[] = [];
  today: string = new Date().toISOString().split('T')[0];
  subbed: boolean = false;
  taskId: number | null = null;
  task: Task | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
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
    this.userService.users$.subscribe((users) => {
      if (users) {
        this.dummyUsers = users;
      } else {
        this.dummyUsers = []; 
      }
    });

    this.activatedRoute.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.taskId = parseInt(params.get('id')!, 10);
        if (this.taskId) {
          this.loadTask();
        }
      }
    });
  }

  loadTask(): void {
    if (this.taskId) {
      this.taskService.getTaskById(this.taskId.toString()).subscribe({
        next: (task) => {
          this.task = task;
          this.taskForm.patchValue(this.task!); 
        },
        error: (err) => {
          console.error('Error loading task:', err);
        }
      });
    }
  }

  onSubmit(): void {
    this.subbed = true;
    if (this.taskForm.valid) {
      const taskData = { ...this.taskForm.value, id: this.taskId?.toString() };

      if (this.taskId) {
        this.taskService.updateTask(taskData);
        this.router.navigate([`/tasks/${this.taskId}`]);
      } else {
        this.taskService.addTask(taskData);
        this.router.navigate(['/tasks']);
      }
    } else {
      console.log('Form is invalid');
    }
  }

  cancel(): void {
    this.router.navigate(['/tasks']);
  }
}
