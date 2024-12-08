import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { TasksModule } from '../tasks/tasks.module';
import { AllTasksRoutingModule } from './all-tasks-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AllTasksComponent } from './all-tasks.component';


@NgModule({
  declarations: [
    AllTasksComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TasksModule,
    AllTasksRoutingModule,
    DragDropModule
  ]
})
export class AllTasksModule { }
