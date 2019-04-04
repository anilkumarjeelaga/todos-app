import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ITodo } from '../shared/interfaces/todo';
import { ICategory } from '../shared/interfaces/category';
import { ITag } from '../shared/interfaces/tag';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getTodos(searchTerm?: string): Observable<ITodo[]>{
    let url = `${this.baseUrl}/todos`;
    if(searchTerm) {
      url += `?search=${searchTerm}`
    }

    return this.http.get(url)
      .pipe(
        map(response => {
          return response as ITodo[];
        })
      )
  }

  getTodo(todoId: string): Observable<ITodo>{
    return this.http.get(`${this.baseUrl}/todos/${todoId}`)
      .pipe(
        map(response => {
          return response as ITodo;
        })
      )
  }

  getCategories(): Observable<ICategory[]>{
    return this.http.get(`${this.baseUrl}/categories`)
      .pipe(
        map(response => {
          return response as ICategory[];
        })
      )
  }

  getTags(): Observable<ITag[]>{
    return this.http.get(`${this.baseUrl}/tags`)
      .pipe(
        map(response => {
          return response as ITag[];
        })
      )
  }

  updateTodo(payload): Observable<any> {
    return this.http.put(`${this.baseUrl}/todos`, payload);
  }

  saveTodo(payload): Observable<any> {
    return this.http.post(`${this.baseUrl}/todos`, payload);
  }

  deleteTodo(todoId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/todos/${todoId}`);
  }
}
