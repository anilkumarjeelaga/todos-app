import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-delete-todo-modal',
  templateUrl: './delete-todo-modal.component.html',
  styleUrls: ['./delete-todo-modal.component.css']
})
export class DeleteTodoModalComponent implements OnInit {

  @Input() todo;
  errorMessage: string = '';

  constructor(public activeModal:NgbActiveModal, private todoService: TodoService) { }

  ngOnInit() {
  }

  performDelete() {
    this.todoService.deleteTodo(this.todo._id).subscribe(
      () => {
        this.activeModal.close(this.todo);
      },
      () => {
        this.errorMessage = "Failed to delete todo";
      }
    );
  }

}
