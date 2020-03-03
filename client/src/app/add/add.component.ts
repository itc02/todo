import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit{
  description : string = '';
  assignTo : string = '';
  newUser : string = '';
  newAddedUser : string = '';
  users : Object;
  isUsernameRight : Boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(){
    this.http.get('http://localhost:3000/getUsers').subscribe(allUsers => {
      this.users = allUsers;
    })
  }

  onInput(e: any): void {
    this.description = e.target.value;
  }

  onSelect(e: any): void {
    this.assignTo = e.target.value;
  }

  onAddUser(e: any): void {
    this.newUser = e.target.value;
  }
  
  onSubmit(): void {
    this.http.post('http://localhost:3000/addTodo', {
      date: new Date().toLocaleDateString(),
      description: this.description,
      assignTo: this.assignTo
    }).subscribe(data => {
      console.log(data)
    })
  }

  onSubmitUser(): void {
    this.http.post('http://localhost:3000/addUser', {
      name: this.newUser
    }).subscribe((data => {
      this.newAddedUser = this.newUser;
      this.isUsernameRight = data['isOkay'];
    }))
  }
}
