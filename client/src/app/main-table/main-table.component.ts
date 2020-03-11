import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { routes, angularComponent } from '../../config/constants';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import {}
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
  newDate = '';
  newDescription = '';
  newAssignation = '';

  constructor(private http: HttpClient, private dialog: MatDialog) { }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.http.get(`${routes.serverURL}/${routes.getTodos}`).subscribe(allTodos => {
      this.createPagination(allTodos);
      this.fillDisabledRowsIdArray(allTodos);
    });
    this.http.get(`${routes.serverURL}/${routes.getUsers}`).subscribe(allUsers => {
      this.users = allUsers;
    });

    // const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
    //   width: '250px',
    //   data: {name: this.name, animal: this.animal}
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

  enableEditingCondition(todo: any): boolean {
    return this.isEditButtonClicked && this.editTodoId !== todo.id || !this.isEditButtonClicked;
  }

  edit(id: number, index: number, isDisabled: boolean): void {
    if (!isDisabled) {
      this.http.get(`${routes.serverURL}/${routes.getUsers}`).subscribe(allUsers => {
        this.users = allUsers;
        this.editTodoId = id;
        this.editIndexId = index;
        this.isEditButtonClicked = true;
      });
    }
  }

  editData(): void {
    const todo = this.unpaginatedTodos[this.editIndexId];
    this.http.post(`${routes.serverURL}/${routes.updateTodo}`, {
      id: todo.id,
      date: this.newDate ? this.newDate : todo.date,
      description: this.newDescription ? this.newDescription : todo.description,
      assigned_to: this.newAssignation ? this.newAssignation : todo.assigned_to
    }).subscribe(allTodos => {
      this.createPagination(allTodos);
      this.isEditButtonClicked = false;
    });
  }

  cancel(): void {
    this.isEditButtonClicked = false;
  }

  delete(id: number): void {
    this.http.post(`${routes.serverURL}/${routes.deleteTodo}`, {todoId: id}).subscribe(allTodosWithoutDeleted => {
      this.createPagination(allTodosWithoutDeleted);
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

  createNewDate(newDate: string): void {
    this.newDate = newDate;
  }

  createNewDescription(newDescription: string): void {
    this.newDescription = newDescription;
  }

  createNewAssignation(newAssignation: string): void {
    this.newAssignation = newAssignation;
  }

  createPagination(data: any) {
    for (let i = 0; i < data.length; i++) {
      data[i].position = i;
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
}
