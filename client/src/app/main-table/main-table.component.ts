import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { routes, angularComponent, deleteDialog } from '../../config/constants';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

interface User {
  id: number,
  name: string
}

@Component({
  selector: angularComponent.selector.mainTable,
  templateUrl: angularComponent.templateUrl.mainTable,
  styleUrls: angularComponent.styleUrls.mainTable
})

export class MainTableComponent implements OnInit {
  todos: any;
  unpaginatedTodos: any;
  positions: any;
  users: any;
  disabledBgColor: object = { backgroundColor: '#fafafa', color: 'rgba(0,0,0,.26)'};
  transparentBgColor: object = { backgroundColor: 'transparent', color: 'black' };
  isEditButtonClicked = false;
  disabledRowsId: number[] = [];
  editTodoId = 0;
  editIndexId = 0;
  rowsInOnePage = [5, 10];
  isDelete = true;

  control = new FormControl();
  filteredOptions: Observable<User[]>;

  constructor(private http: HttpClient, private dialog: MatDialog) { }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    
    this.http.get(`${routes.serverURL}/${routes.getTodos}`).subscribe(allTodos => {
      this.createPagination(allTodos);
      this.fillDisabledRowsIdArray(allTodos);
    });
    this.http.get(`${routes.serverURL}/${routes.getUsers}`).subscribe(allUsers => {
      this.users = allUsers;
      this.filteredOptions = this.control.valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.users.slice())
      );
    });
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  _filter(name: string): User[] {
    const filterValue = name.toLowerCase();
    return this.users.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  enableEditingCondition(todo: any): boolean {
    return this.isEditButtonClicked && this.editTodoId !== todo.id || !this.isEditButtonClicked;
  }

  edit(id: number, index: number, title: string, description: string, user: string, deadline: string, isDisabled: boolean): void {
    if (!isDisabled) {
      this.http.get(`${routes.serverURL}/${routes.getUsers}`).subscribe(allUsers => {
        this.users = allUsers;
        this.editTodoId = id;
        this.editIndexId = index;
        this.isEditButtonClicked = true;
      });
      this.control.setValue({name: 'Ivan'})
      this.dialog.open(DialogEditComponent, {
        width: '600px',
        data: {
          title, 
          description, 
          assignTo: user, 
          deadline,
          control: this.control,
          displayFn: this.displayFn,
          filteredOptions: this.filteredOptions
        }
      }).afterClosed().subscribe(result => {
        if(result) {
          this.editData(result);
        }
      });
    }
  }

  editData(result): void {
    console.log(result)
    const todo = this.todos.filteredData[this.editIndexId];
    this.http.post(`${routes.serverURL}/${routes.updateTodo}`, {
      id: todo.id,
      deadline: result.deadline || todo.date,
      title: result.title || todo.title,
      description: result.description || todo.description,
      assigned_to: result.assignTo || todo.assigned_to
    }).subscribe(allTodos => {
      this.createPagination(allTodos);
      this.isEditButtonClicked = false;
    });
  }

  cancel(): void {
    this.isEditButtonClicked = false;
  }

  delete(id: number): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: deleteDialog.width,
      data: {isDelete: this.isDelete }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.post(`${routes.serverURL}/${routes.deleteTodo}`, {todoId: id}).subscribe(allTodosWithoutDeleted => {
          this.createPagination(allTodosWithoutDeleted);
        });
      }
    });
  }

  disable(id: number): void {
    const index = this.disabledRowsId.indexOf(id);
    if (index === -1) {
      this.disabledRowsId.push(id);
    } else {
      this.disabledRowsId.splice(index, 1);
    }
    this.http.post(`${routes.serverURL}/${routes.disableTodo}`, {
      id,
      is_disabled: this.disabledRowsId.indexOf(id) >= 0
    }).subscribe(allTodos => {
      this.createPagination(allTodos);
    });
  }

  createPagination(data: any) {
    for (let i = 0; i < data.length; i++) {
      data[i].position = i;
      data[i].deadline = data[i].deadline.split('T')[0];
    }
    this.unpaginatedTodos = data;
    this.todos = new MatTableDataSource(data);
    this.todos.paginator = this.paginator;
  }

  updateUsers($event) {
    this.http.get(`${routes.serverURL}/${routes.getUsers}`).subscribe(allUsers => {
      this.users = allUsers;
      this.http.post(`${routes.serverURL}/${routes.updateTodos}`, { deletedUserName: $event.deletedUserName }).subscribe(allTodos => {
        this.createPagination(allTodos);
      });
    });
  }

  fillDisabledRowsIdArray(data: any) {
    this.disabledRowsId = data.map(item => {
      if (item.is_disabled) {
        return item.id;
      }
    });
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.todos.filter = filterValue.trim().toLowerCase();
  }
}
