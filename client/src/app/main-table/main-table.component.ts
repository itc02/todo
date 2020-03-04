import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.css']
})


export class MainTableComponent implements OnInit {
  todos: Object;
  isDisabled: Boolean = false;
  recordsBgColor: Object = {backgroundColor: 'transparent'};
  disableText: string = 'Disable';
  disabledRowId: number;
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/getTodos').subscribe(allTodos => {
      this.todos = allTodos
    });
  }

  edit(e: any) : void {
    console.log(7)
  }

  delete(e: any) : void {
    const id: number = parseInt(e.target.id.substring(8, e.target.id.length));
    this.http.post('http://localhost:3000/deleteTodo', {todoId: id}).subscribe(allTodosWithoutDeleted => {
      this.todos = allTodosWithoutDeleted;
    });
  }

  disable(e: any) : void {
    this.isDisabled = !this.isDisabled;
    this.disableText = this.isDisabled ? 'Enable' : 'Disable';
    this.recordsBgColor = {'backgroundColor' : this.isDisabled ? '#747c7c' : 'transparent'};
    this.disabledRowId = parseInt(e.target.id.substring(9, e.target.id.length));
  }

}
