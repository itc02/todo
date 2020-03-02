import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  descriptionName = 'description';
  assignToName = 'assignTo';
  
  constructor(private http: HttpClient) {
    console.log(8484)
    this.http.post('http://localhost:3000/addTodo', {hello: 'hello'}).toPromise().then(data => {
      console.log(data)
    }).catch(err => {
      console.log(err)
    })
  }

  ngOnInit(): void {
  }
  
  onSubmit(): void {
    console.log(this)
  }
}
