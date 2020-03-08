import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any;
  unpaginatedUsers: any;

  constructor(private http: HttpClient) { }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @Output() event = new EventEmitter<Boolean>();

  ngOnInit(): void {
    this.http.get('http://localhost:3000/getUsers').subscribe(allUsers => {
      this.createPagination(allUsers)
    })
  }

  delete(id: number): void {
    this.http.post('http://localhost:3000/deleteUser', {userId: id}).subscribe(allUsersWithoutDeleted => {
      this.createPagination(allUsersWithoutDeleted);
      this.event.emit(true);
    });
  }

  createPagination(data: any) {
    for(let i:number = 0; i < data.length; i++){
      data[i].position = i;
    }
    this.unpaginatedUsers = data;
    this.users = new MatTableDataSource(data);
    this.users.paginator = this.paginator;
  }
}
