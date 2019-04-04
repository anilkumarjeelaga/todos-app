import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AddEditTodoComponent } from './add-edit-todo/add-edit-todo.component';

import { RouterModule } from '@angular/router';
import { TemplateDrivenAddEditTodoComponent } from './template-driven-add-edit-todo/template-driven-add-edit-todo.component';
import { DeleteTodoModalComponent } from './delete-todo-modal/delete-todo-modal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  declarations: [TodoListComponent, AddEditTodoComponent, TemplateDrivenAddEditTodoComponent, DeleteTodoModalComponent],
  exports: [TodoListComponent, AddEditTodoComponent],
  providers: [],
  entryComponents: [DeleteTodoModalComponent]
})
export class TodoModule { }
