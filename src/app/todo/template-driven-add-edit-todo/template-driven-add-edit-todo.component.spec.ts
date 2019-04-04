import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDrivenAddEditTodoComponent } from './template-driven-add-edit-todo.component';

describe('TemplateDrivenAddEditTodoComponent', () => {
  let component: TemplateDrivenAddEditTodoComponent;
  let fixture: ComponentFixture<TemplateDrivenAddEditTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateDrivenAddEditTodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateDrivenAddEditTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
