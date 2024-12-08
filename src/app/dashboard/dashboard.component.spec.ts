import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { DashboardComponent } from './dashboard.component';
import { Task } from '../core/models/task.model';


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [MatDialogModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call openTaskFormDialog when the "Create Task" button is clicked', () => {
    spyOn(component, 'openTaskFormDialog');

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(component.openTaskFormDialog).toHaveBeenCalled();
  });
  it('should add a new task to the tasks array when onTaskCreated is called', () => {
    const newTask: Task =
    {
      id: '1',
      name: 'Task 1',
      description: 'Description for Task 1',
      priority: 'High',
      status: 'Pending',
      assignedTo: 'John',
      dueDate: new Date()
    };

    component.onTaskCreated(newTask);

    expect(component.tasks.length).toBe(36);
    expect(component.tasks[0].name).toEqual(newTask.name);
    expect(component.tasks[0].description).toEqual(newTask.description);
    expect(component.tasks[0].priority).toEqual(newTask.priority);
    expect(component.tasks[0].status).toEqual(newTask.status);
    expect(component.tasks[0].assignedTo).toEqual(newTask.assignedTo);
    expect(component.showTaskForm).toBeFalse();
  });


});
