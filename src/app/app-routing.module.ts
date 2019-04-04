import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { AddEditTodoComponent } from './todo/add-edit-todo/add-edit-todo.component';
import { TemplateDrivenAddEditTodoComponent } from './todo/template-driven-add-edit-todo/template-driven-add-edit-todo.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routers: Routes = [
  { path: 'todos', component: TodoListComponent },
  { path: 'todo/:id', component:  AddEditTodoComponent},
  { path: 'template-todo/:id', component:  TemplateDrivenAddEditTodoComponent},

  { path: '', redirectTo: 'todos', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routers, { enableTracing: false })
  ],
  declarations: []
})
export class AppRoutingModule { }
