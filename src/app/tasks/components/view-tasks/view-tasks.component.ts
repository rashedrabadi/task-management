import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/core/services/task.service';
import { Task } from 'src/app/core/models/task.model';
@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.scss']
})
export class ViewTasksComponent implements OnInit {
  taskId: any;
  task: Task | null = null;
  constructor(private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.taskId = parseInt(params.get('id')!);
        if (this.taskId) {
          this.loadTask();
        }
      }


    });
  }
  loadTask(): void {
    if (this.taskId !== null) {
      this.taskService.getTaskById(this.taskId.toString()).subscribe(res => {
        this.task = res;
      });

    }
  }

  openEdit(): void {
    this.router.navigate([`/tasks/${this.taskId}/edit`]);
  }
  leave() {
    this.router.navigate([`/tasks`]);
  }
}
