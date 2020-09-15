import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( ) { }
  title="Lets do shopping";
  todos = [
      {
        label:'Bring Bread',
      done:false,
      priority:3
    },
    {
         label:'Bring water',
      done:true,
      priority:4
    },
    {
      label:'Bring eggs',
      done:false,
      priority:6},{ label:'Bring dagga',
      done:false,
       priority:3
      }
];
addTodo(newTodoLabel)
  {
    var newTodo = {
      label: newTodoLabel,
      priority:1,
      done:false
    };
    this.todos.push(newTodo);
  }
  deleteTodo(todo)
  {
    this.todos = this.todos.filter(t=> t.label !== todo.label);
  }
  editTodo(todo)
  {
    this.todos =this.todos.reverse();
  }


  ngOnInit(): void {
  }


}
