import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.css']
})

export class MainTableComponent implements OnInit {
  todos: Object;
  disabledBgColor: Object = { backgroundColor: '#747c7c', color: 'white' };
  transparentBgColor: Object = { backgroundColor: 'transparent', color: 'black' };
  isEditButtonClicked: Boolean = false;
  disabledRowsId: number[] = [];
  editTodoId: number = 0;
  editIndexId: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/getTodos').subscribe(allTodos => {
      this.todos = allTodos
    });
  }

  enableEditingCondition(todo: any): Boolean {
    return this.isEditButtonClicked && this.editTodoId != todo.id || !this.isEditButtonClicked
  }

  edit(e: any) : void {
    const id = e.target.id;
    const pipeId = id.indexOf('|');
    this.editTodoId = parseInt(id.substring(0, pipeId + 1));
    this.editIndexId = parseInt(id.substring(pipeId + 1, id.length));
    this.isEditButtonClicked = true;
  }

  editData() : void {
    this.isEditButtonClicked = false;  
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
  }

}
