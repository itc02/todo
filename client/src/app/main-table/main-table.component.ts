import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.css']
})

export class MainTableComponent implements OnInit {
  todos: any;
  unpaginatedTodos: any;
  positions: any;
  users: any;
  disabledBgColor: Object = { backgroundColor: '#fafafa', color: 'rgba(0,0,0,.26)'};
  transparentBgColor: Object = { backgroundColor: 'transparent', color: 'black' };
  isEditButtonClicked: Boolean = false;
  disabledRowsId: number[] = [];
  editTodoId: number = 0;
  editIndexId: number = 0;
  newDate: string = '';
  newDescription: string = '';
  newAssignation: string = '';

  constructor(private http: HttpClient) { }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.http.get('http://localhost:3000/getTodos').subscribe(allTodos => {
      this.createPagination(allTodos);
      this.fillDisabledRowsIdArray(allTodos);
    });
    this.http.get('http://localhost:3000/getUsers').subscribe(allUsers => {
      this.users = allUsers;
    });
  }

  enableEditingCondition(todo: any): Boolean {
    return this.isEditButtonClicked && this.editTodoId != todo.id || !this.isEditButtonClicked;
  }

  edit(id: number, index: number, is_disabled: Boolean) : void {
    if(!is_disabled) {
      this.http.get('http://localhost:3000/getUsers').subscribe(allUsers => {
        this.users = allUsers;
        this.editTodoId = id;
        this.editIndexId = index;
        this.isEditButtonClicked = true;
      });
    }
  }

  editData() : void {
    const todo = this.unpaginatedTodos[this.editIndexId];
    this.http.post('http://localhost:3000/updateTodo', {
      id: todo.id,
      date: this.newDate ? this.newDate : todo.date,
      description: this.newDescription ? this.newDescription : todo.description,
      assigned_to: this.newAssignation ? this.newAssignation : todo.assigned_to
    }).subscribe(allTodos => {
      this.createPagination(allTodos);
      this.isEditButtonClicked = false; 
    });
  }

  cancel() : void {
    this.isEditButtonClicked = false; 
  }

  delete(id: number) : void {
    this.http.post('http://localhost:3000/deleteTodo', {todoId: id}).subscribe(allTodosWithoutDeleted => {
      this.createPagination(allTodosWithoutDeleted);
    });
  }

  disable(id: number) : void {
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
      this.createPagination(allTodos);
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

  createPagination(data: any) {
    for(let i:number = 0; i < data.length; i++){
      data[i].position = i;
    }
    this.unpaginatedTodos = data;
    this.todos = new MatTableDataSource(data);
    this.todos.paginator = this.paginator;
  }

  updateUsers() {
    this.http.get('http://localhost:3000/getUsers').subscribe(allUsers => {
      this.users = allUsers;
      const usersName = this.users.map(item => {
        return item.name;
      });
      
      this.http.post('http://localhost:3000/updateTodos', {users: usersName}).subscribe(allTodos => {
        this.createPagination(allTodos);
      });
    });
  }

  fillDisabledRowsIdArray(data: any) {
    this.disabledRowsId = data.map(item => {
      if(item.is_disabled) {
        return item.id
      } 
    });
  }
}
