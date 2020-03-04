import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit{
  description : string = '';
  assignTo : string = '';
  newUser : string = '';
  users : Object;
  isUsernameRight : Boolean = false;
  descriptionText : string = '';

  constructor(private http: HttpClient, private router: Router) { }

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
    console.log(5)
    this.http.post('http://localhost:3000/addTodo', {
      date: new Date().toLocaleDateString(),
      description: this.description,
      assignTo: this.assignTo
    }).subscribe(data => {
      this.router.navigate(['/main']);
    });
  }

  onSubmitUser(): void {
    this.http.post('http://localhost:3000/addUser', {
      name: this.newUser
    }).subscribe((data => {
      this.router.navigate(['/main']);
    }))
  }
}
