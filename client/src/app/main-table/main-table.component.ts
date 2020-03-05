import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.css']
})

export class MainTableComponent implements OnInit {
  todos: Object;
  users: Object;
  disabledBgColor: Object = { backgroundColor: '#747c7c', color: 'white' };
  transparentBgColor: Object = { backgroundColor: 'transparent', color: 'black' };
  isEditButtonClicked: Boolean = false;
  disabledRowsId: number[] = [];
  editTodoId: number = 0;
  editIndexId: number = 0;
  newDate: string = '';
  newDescription: string = '';
  newAssignation: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/getTodos').subscribe(allTodos => {
      this.todos = allTodos
    });
    this.http.get('http://localhost:3000/getUsers').subscribe(allUsers => {
      this.users = allUsers;
    });
  }

  enableEditingCondition(todo: any): Boolean {
    return this.isEditButtonClicked && this.editTodoId != todo.id || !this.isEditButtonClicked
  }

  edit(e: any) : void {
    this.http.get('http://localhost:3000/getUsers').subscribe(allUsers => {
      this.users = allUsers;
      const id = e.target.id;
      const pipeId = id.indexOf('|');
      this.editTodoId = parseInt(id.substring(0, pipeId + 1));
      this.editIndexId = parseInt(id.substring(pipeId + 1, id.length));
      this.isEditButtonClicked = true;
    })
    
  }

  editData() : void {
    const todo = this.todos[this.editIndexId]
    this.http.post('http://localhost:3000/updateTodo', {
      id: todo.id,
      date: this.newDate ? this.newDate : todo.date,
      description: this.newDescription ? this.newDescription : todo.description,
      assigned_to: this.newAssignation ? this.newAssignation : todo.assigned_to
    }).subscribe(allTodos => {
      this.todos = allTodos;
      this.isEditButtonClicked = false; 
    });
  }

  cancel() : void {
    this.isEditButtonClicked = false; 
  }

  delete(e: any) : void {
    const id: number = parseInt(e.target.id.substring(8, e.target.id.length));
    this.http.post('http://localhost:3000/deleteTodo', {todoId: id}).subscribe(allTodosWithoutDeleted => {
      this.todos = allTodosWithoutDeleted;
    });
  }

  disable(e: any) : void {
    const id = parseInt(e.target.id.substring(9, e.target.id.length));
    const index = this.disabledRowsId.indexOf(id);
     if (index == -1) {
      this.disabledRowsId.push(id);
    } else {
      this.disabledRowsId.splice(index, 1);
    }
    this.http.post('http://localhost:3000/disableTodo', {
      id: id,
      is_disabled: this.disabledRowsId.indexOf(id) >= 0
    }).subscribe(allTodos => {
      this.todos = allTodos;
    })
   
  }

  createNewDate(newDate: string) : void {
    this.newDate = newDate;
  }

  createNewDescription(newDescription: string) : void {
    this.newDescription = newDescription;
  }

  createNewAssignation(newAssignation: string) : void {
    this.newAssignation = newAssignation;
  }
}
