import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { angularComponent, routes, snack } from '../../config/constants';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: angularComponent.templateUrl.dialogAddUser,
  styleUrls: angularComponent.styleUrls.dialogAddUser
})
export class DialogAddUserComponent implements OnInit {

  constructor(
    private http: HttpClient, 
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
    private snackBar: MatSnackBar
  ) { }

  user: string;
  users: any;

  ngOnInit(): void{
    this.getUsers()
  }

  isUsernameValid(): boolean {
    return this.user && this.users.indexOf(this.user) < 0
  }

  add(): void {
    if(this.users.indexOf(this.user) >= 0) {
      this.snackBar.open(snack.user.exist, snack.undo);
    } else {
      this.addUser();
    }
  }

  addUser() {
    this.http.post(`${routes.serverURL}/${routes.addUser}`, {
      user_name: this.user
    }).subscribe(() => {
      this.getUsers();
      this.snackBar.open(snack.user.add, snack.undo);
    })
  }

  getUsers(): void {
    this.http.get(`${routes.serverURL}/${routes.getUsers}`).subscribe(allUsers => {
      // @ts-ignore
      this.users = allUsers.map(user => user.user_name);
    })
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
