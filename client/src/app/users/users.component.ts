import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { routes, angularComponent } from '../../config/constants';
@Component({
  selector: angularComponent.selector.users,
  templateUrl: angularComponent.templateUrl.users,
  styleUrls: angularComponent.styleUrls.users
})

export class UsersComponent implements OnInit {

  users: any;
  unpaginatedUsers: any;

  constructor(private http: HttpClient) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @Output() event = new EventEmitter<any>();

  ngOnInit(): void {
    this.http.get(`${routes.serverURL}/${routes.getUsers}`).subscribe(allUsers => {
      this.createPagination(allUsers);
    });
  }

  delete(id: number): void {
    this.http.post(`${routes.serverURL}/${routes.deleteUser}`, { userId: id }).subscribe((data: any) => {
      this.createPagination(data.allUsersWithoutDeleted);
      this.event.emit({ deletedUserName: data.deletedUserName });
    });
  }

  createPagination(data: any) {
    for (let i = 0; i < data.length; i++) {
      data[i].position = i;
    }
    this.unpaginatedUsers = data;
    this.users = new MatTableDataSource(data);
    this.users.paginator = this.paginator;
  }
}
