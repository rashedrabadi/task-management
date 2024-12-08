import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailsComponent } from './task-details.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('TaskDetailsComponent', () => {
  let component: TaskDetailsComponent;
  let fixture: ComponentFixture<TaskDetailsComponent>;
  class MatDialogRefStub {
    close() {
    }
  }
  const dialogDataMock = {
    data: 'mock data'  
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskDetailsComponent ] ,
      imports: [ MatDialogModule ],   
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefStub } ,  
        { provide: MAT_DIALOG_DATA, useValue: dialogDataMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return correct priority color', () => {
    const component = fixture.componentInstance;
  
    expect(component.getPriorityColor('low')).toBe('accent');
    expect(component.getPriorityColor('medium')).toBe('primary');
    expect(component.getPriorityColor('high')).toBe('warn');
    expect(component.getPriorityColor('undefinedValue')).toBe('');
  });
  
});
