import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Object;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/getUsers').subscribe(allUsers => {
      this.users = allUsers;
    })
  }

  deleteUser(e: any): void {
    const id:number = parseInt(e.target.id.substring(4, e.target.id.length));
    this.http.post('http://localhost:3000/deleteUser', {userId: id}).subscribe(allUsersWithoutDeleted => {
      this.users = allUsersWithoutDeleted;
    });
  }

}
