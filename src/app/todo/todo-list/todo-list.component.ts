import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from '../todo.service';
import { ITodo } from '../../shared/interfaces/todo';
import { fromEvent, Observable } from 'rxjs';
import { map, debounceTime, switchMap, tap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteTodoModalComponent } from '../delete-todo-modal/delete-todo-modal.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {

  todos: ITodo[];
  search$: Observable<ITodo[]>;
  todoListSubscriber: any;
  searchSubscriber: any;
  isLoading: boolean = false;
  successMessage: string = '';

  constructor(private todoService: TodoService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadTodos();

    /** Search todo feature */
    let searchBox = document.getElementById('search-box');
    this.search$ = fromEvent(searchBox, 'input').pipe(
      tap(event => console.log(event)),
      map((event: KeyboardEvent) => {
        // return event.target.value; // We will get compilation error.
        return (<HTMLInputElement>event.target).value;
        // return event.target['value']; // We can do like this also to avoid TS compilation errors.
      }),
      tap(value => console.log(value)),
      debounceTime(250),
      switchMap(text => {
        this.isLoading = true;
        return this.todoService.getTodos(text);
      })
    );

    this.searchSubscriber = this.search$.subscribe((data: ITodo[]) => {
      this.isLoading = false;
      this.todos = data;
      console.log(this.todos);
    });
  }

  loadTodos() {
    this.isLoading = true;
    this.todoListSubscriber = this.todoService.getTodos()
      .subscribe((data: ITodo[]) => {
        this.todos = data;
        this.isLoading = false;
        console.log(this.todos);
      });
  }

  confirmDelete(todo) {
    let deleteModalReference = this.modalService.open(DeleteTodoModalComponent, {
      backdrop: 'static',
      keyboard: false,
      windowClass: 'delete-modal'
    });

    deleteModalReference.componentInstance.todo = todo;
    deleteModalReference.result.then((result) => {
      console.log(result);
      this.loadTodos();
      this.successMessage = 'Todo deleted successfully';
    }, (reason) => {
      console.log(reason);
      console.log('Modal dismissed');
    });
  }

  ngOnDestroy(){
    this.todoListSubscriber.unsubscribe();
    this.searchSubscriber.unsubscribe();
  }

}
