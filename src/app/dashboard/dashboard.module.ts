import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../material.module';
import { TasksModule } from '../tasks/tasks.module';
import { DashboardRoutingModule } from './dashbaord-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TasksModule,
    DashboardRoutingModule  ,
    DragDropModule  
  ]
})
export class DashboardModule { }
