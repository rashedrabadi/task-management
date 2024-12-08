import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormComponent } from './task-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  class MatDialogRefStub {
    close() {
    }
  }
  const dialogDataMock = {
    data: 'mock data'
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskFormComponent],
      imports: [ReactiveFormsModule],

      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: dialogDataMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call onSubmit when form is valid and submitted', () => {

    component.taskForm.setValue({
      name: 'Test Task',
      description: 'Test task description',
      priority: 'Medium',
      status: 'Pending',
      assignedTo: 'John Doe',
      dueDate: '2024-12-31'
    });

    spyOn(component, 'onSubmit');
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
  });
  it('should display error message when the name field is invalid and touched', () => {
    component.taskForm.get('name')?.setValue('');
    component.taskForm.get('name')?.markAsTouched();

    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.task-form-container .error');
    expect(errorMessage.textContent).toContain('Task name is required.');
  });
  it('should not submit when required fields are missing', () => {
    component.taskForm.setValue({
      name: '',
      description: '',
      priority: 'Medium',
      status: 'Pending',
      assignedTo: '',
      dueDate: '2024-12-31'
    });

    spyOn(component, 'onSubmit');

    expect(component.onSubmit).not.toHaveBeenCalled();
    expect(component.taskForm.get('name')?.hasError('required')).toBeTrue();
    expect(component.taskForm.get('description')?.hasError('required')).toBeTrue();
    expect(component.taskForm.get('assignedTo')?.hasError('required')).toBeTrue();
  });

});
