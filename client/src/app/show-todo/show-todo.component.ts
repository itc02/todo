import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { routes, angularComponent } from '../../config/constants'

@Component({
  templateUrl: angularComponent.templateUrl.showTodo,
  styleUrls: angularComponent.styleUrls.showTodo
})
export class ShowTodoComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.getTodoById(this.route.snapshot.params.id)
  }

  getTodoById(id: number) {
    this.http.post(`${routes.serverURL}/${routes.getUserById}`, { id }).subscribe(todo => {
      console.log(todo)
    })
  }
}
