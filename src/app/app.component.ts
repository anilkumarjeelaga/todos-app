import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  isAddEditTodo: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(
      event => {
        if(event instanceof ActivationEnd) {
          console.log(event);
          let path = event.snapshot.routeConfig.path;
          if(path === 'todo/:id' || path === 'template-todo/:id') {
            this.isAddEditTodo = true;
          } else {
            this.isAddEditTodo = false;
          }
        }
      }
    );
  }

}
