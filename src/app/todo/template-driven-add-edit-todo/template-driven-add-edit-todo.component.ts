import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITodo } from '../../shared/interfaces/todo';
import { ICategory } from '../../shared/interfaces/category';
import { ITag } from '../../shared/interfaces/tag';
import { TodoService } from '../todo.service';
import { forkJoin, Observable } from 'rxjs';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-driven-add-edit-todo',
  templateUrl: './template-driven-add-edit-todo.component.html',
  styleUrls: ['./template-driven-add-edit-todo.component.css']
})
export class TemplateDrivenAddEditTodoComponent implements OnInit {

  isEdit: boolean;
  categories: ICategory[];
  tags: ITag[];
  isFormLoading: boolean = false;
  currentDate: Date = new Date();
  todo = {
    _id: '',
    title: '',
    isCompleted: false,
    targetDate: { 
      year: this.currentDate.getFullYear(), 
      month: this.currentDate.getMonth()+1,
      day: this.currentDate.getDate()
    } as NgbDateStruct,
    tags: [],
    category: ''
  };
  errorMessage: string = '';

  constructor(private route: ActivatedRoute,
              private todoService: TodoService,
              private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.todo._id = params.get('id');
        if(this.todo._id === '0' || !this.todo._id) {
          this.isEdit = false;
        } else {
          this.isEdit = true;
        }
      }
    );

    let categories$ = this.todoService.getCategories();  
    let tags$ = this.todoService.getTags();  
    let todo$ = this.todoService.getTodo(this.todo._id);  
    let restCalls: Array<Observable<any>> = [categories$, tags$];

    if(this.isEdit) {
      restCalls.push(todo$);
    }

    this.isFormLoading = true;
    forkJoin(restCalls).subscribe(
      ([categories, tags, todo]) => {
        this.isFormLoading = false;
        this.categories = categories;
        this.tags = tags;
        this.formatTagControls();
        if(this.isEdit) {
          this.formatTodo(todo as ITodo);
          this.updateTagControls(todo.tags);
        }
      },
      error => {
        console.log(error);
        this.isFormLoading = false;
      }
    );
  }

  formatTagControls() {
    if(this.tags.length) {
      for(let tag of this.tags) {
        tag.selected = false;
      }
    }
  }

  formatTodo(sourceTodo: ITodo) {
    this.todo._id = sourceTodo._id;
    this.todo.title = sourceTodo.title;
    this.todo.isCompleted = sourceTodo.isCompleted as boolean;
    this.todo.targetDate = this.formatTargetDate(sourceTodo.targetDate);
    this.todo.category = sourceTodo.category._id;
  }

  formatTargetDate(date: string): NgbDateStruct {
    let targetDate: Date = new Date(date);
    return {year: targetDate.getFullYear(), month: targetDate.getMonth()+1, day: targetDate.getDate()}
  }

  updateTagControls(sourceTags: ITag[]) {
    if(sourceTags.length) {
      let tagIds = sourceTags.map(tag => tag._id);
      this.tags = this.tags.map(tag => {
        if(tagIds.indexOf(tag._id) !== -1) {
          tag.selected = true;
        }
        return tag;
      });
      console.log(this.tags);
    }
  }

  updateTagOnChange(tagChanged, event) {
    this.tags = this.tags.map(tag => {
      if(tag._id == tagChanged._id) {
        tag.selected = (<HTMLInputElement>event.target).checked;
      }
      return tag;
    });
  }

  formatPayload(payload) {
    let date = payload.targetDate;
    payload.targetDate = new Date(`${date.year}/${date.month}/${date.day}`);
    
    payload.tags = this.tags.filter(value => value.selected).map(value => value._id);

    return payload;
  }

  saveTodo(todoForm) {
    if(todoForm.valid) {
      let payload = this.formatPayload(todoForm.value);
      console.log(payload);
      if(this.isEdit) {
        payload.id = this.todo._id;
        this.todoService.updateTodo(payload)
            .subscribe((data) => {
              this.router.navigate(['todos']);
            },
            (err: any) => {
              console.log(err);
              this.errorMessage = err.error.error || 'Failed to update Todo';
            });
      } else {
        this.todoService.saveTodo(payload)
            .subscribe((data) => {
              this.router.navigate(['todos']);
            },
            (err: any) => {
              this.errorMessage = err.error.error || 'Failed to add Todo';
            });
      }
    }
  }

  cancle(event) {
    event.preventDefault();
    this.router.navigate(['todos']);
  }

}
