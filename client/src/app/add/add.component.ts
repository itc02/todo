import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { routes, snack, angularComponent } from '../../config/constants';

@Component({
  templateUrl: angularComponent.templateUrl.add,
  styleUrls: angularComponent.styleUrls.add
})

export class AddComponent implements OnInit {
  description = '';
  assignTo = '';
  newUser = '';
  users: any;
  usersName: any = [];
  isValidData = true;
  isButtonClicked = false;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createUsers();
  }

  onSubmit(): void {
    this.isButtonClicked = true;
    if (this.description && this.assignTo && this.newUser) {
      this.addTodo();
      if (this.isUserExists()) {
        this.openSnackBar(snack.error.todoAndUser, snack.duration);
      } else {
        this.addUser();
        this.openSnackBar(snack.success.todoAndUser, snack.duration);
      }
    } else if (this.description && this.assignTo) {
      this.addTodo();
      this.openSnackBar(snack.success.todo, snack.duration);
    } else if (this.newUser) {
      if (this.isUserExists()) {
        this.openSnackBar(snack.error.user, snack.duration);
      } else {
        this.addUser();
        this.openSnackBar(snack.success.user, snack.duration);
      }
    } else {
      this.isValidData = false;
      this.openSnackBar(snack.error.todo, snack.duration);
    }
  }

  addTodo() {
    this.http.post(`${routes.serverURL}/${routes.addTodo}`, {
      date: new Date().toLocaleDateString(),
      description: this.description,
      assignTo: this.assignTo
    }).subscribe();
  }

  addUser(): void {
    this.http.post(`${routes.serverURL}/${routes.addUser}`, { name: this.newUser }).subscribe((data => {
      this.createUsers();
    }));
  }

  isUserExists(): boolean {
    return this.usersName.indexOf(this.newUser) >= 0;
  }

  openSnackBar(message: string, duration: number) {
    this.snackBar.open(message, snack.close, { duration });
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
    this.http.get(`${routes.serverURL}/${routes.getUsers}`).subscribe(allUsers => {
      this.users = allUsers;
      this.createUsersName();
    });
  }

  createUsersName() {
    for (const user of this.users) {
      this.usersName.push(user.name);
    }
  }
}
