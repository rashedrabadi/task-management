import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllTasksComponent } from './all-tasks.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('AllTasksComponent', () => {
  let component: AllTasksComponent;
  let fixture: ComponentFixture<AllTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTasksComponent ],
      imports: [ MatDialogModule ],  
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
