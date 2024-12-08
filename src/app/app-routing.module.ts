import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { AddEditTaskComponent } from './tasks/components/add-edit-task/add-edit-task.component';
import { ViewTasksComponent } from './tasks/components/view-tasks/view-tasks.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tasks', component: AllTasksComponent },
  { path: 'tasks/add', component: AddEditTaskComponent }, 
  { path: 'tasks/:id/edit', component: AddEditTaskComponent }, 
  { path: 'tasks/:id', component: ViewTasksComponent },
  { path: 'user-list', component: UserListComponent },  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
