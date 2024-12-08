import { NgModule } from '@angular/core';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { MaterialModule } from '../material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditTaskComponent } from './components/add-edit-task/add-edit-task.component';
import { CommonModule } from '@angular/common';
import { ViewTasksComponent } from './components/view-tasks/view-tasks.component';


@NgModule({
  declarations: [
    TaskListComponent,
    TaskFormComponent,
    TaskDetailsComponent,
    AddEditTaskComponent,
    ViewTasksComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [TaskListComponent,TaskFormComponent],
  providers: [],
  bootstrap: []
})
export class TasksModule { }
