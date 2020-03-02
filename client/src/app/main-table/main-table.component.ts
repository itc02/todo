import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.css']
})


export class MainTableComponent implements OnInit {
  todos: Object

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/getTodos').subscribe(allTodos => {
      this.todos = allTodos
    });
  }

}
