import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit{
  description : string = '';
  assignTo : string = '';
  newUser : string = '';
  users : any;
  usersName: any = [];
  isValidData: Boolean = true;
  isButtonClicked: Boolean = false;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  ngOnInit(){
    this.createUsers();
  }
  
  onSubmit(): void {
    this.isButtonClicked = true;
    if(this.description && this.assignTo && this.newUser){
      this.addTodo();
      if(!this.addUser()) {
        this.openSnackBar('Todo was added successfuly, but user already exists', 3000);
      } else {
        this.openSnackBar('Todo and user were added successfully', 3000);
      }
    } else if(this.description && this.assignTo) {
      this.addTodo();
      this.openSnackBar('Todo was added successfully', 3000);
    } else if(this.newUser) {
      if(this.addUser()) {
        this.openSnackBar('User was added successfully', 3000);
      } else {
        this.openSnackBar('User already exists', 3000);
      }
    } else {
      this.isValidData = false;
      this.openSnackBar('Some data is filled wrong', 3000);
    }
  }

  addTodo() {
    this.http.post('http://localhost:3000/addTodo', {
      date: new Date().toLocaleDateString(),
      description: this.description,
      assignTo: this.assignTo
    }).subscribe(data => { });
  }

  addUser(): Boolean {
    let isOkay: Boolean = true;
    if(this.usersName.indexOf(this.newUser) >= 0) {
      isOkay = false;
    } else {
      this.http.post('http://localhost:3000/addUser', {
        name: this.newUser
      }).subscribe((data => {
          this.createUsers();
        }))
    }
    return isOkay;
  }

  openSnackBar(message: string, duration: number){
    this.snackBar.open(message, 'Close', {
      duration: duration
    });
  }

  onInput(description: string): void {
    this.description = description;
  }

  onSelect(assignTo: string): void {
    this.assignTo = assignTo;
  }

  onAddUser(user: string): void {
    this.newUser = user;
  }
  
  createUsers() {
    this.http.get('http://localhost:3000/getUsers').subscribe(allUsers => {
      this.users = allUsers;
      this.createUsersName();
    });
  }

  createUsersName() {
    for(let i = 0; i < this.users.length; i++) {
      this.usersName.push(this.users[i].name);
    }
  }
}
