import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user-list.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule  ,
    FormsModule
  ],
  exports: [UserListComponent] 
})
export class UserListModule { }
