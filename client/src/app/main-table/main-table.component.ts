//************************************ Main ***********************************
import { Component, OnInit, ViewChild } from '@angular/core';

//************************************ HTTP ************************************
import { HttpClient } from '@angular/common/http';

//*********************************** Constants **************************************
import { routes, angularComponent, dialog, editDialog, snack } from '../../config/constants';

//*********************************** Dialog **********************************
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { DialogShowUsersComponent } from '../dialog-show-users/dialog-show-users.component';

//************************************ Sorting *******************************
import { MatSort } from '@angular/material/sort';

//************************************ Pagination ********************************
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

//************************************ Snack bar ***********************************
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: angularComponent.selector.mainTable,
  templateUrl: angularComponent.templateUrl.mainTable,
  styleUrls: angularComponent.styleUrls.mainTable
})

export class MainTableComponent implements OnInit {
  todos: any;
  unpaginatedTodos = [];
  columns = ['actions', 'title', 'state_name', 'user_name', 'deadline'];
  columnsHeaders = ['Title', 'State', 'Assigned to', 'Due date'];
  disabledRowsId: number[] = [];
  editIndexId = 0;
  rowsInOnePage: number[] = [5, 10];
  filterString = this.columnsHeaders[0];

  constructor(
    private http: HttpClient, 
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

//*************************************************** Main methods ***********************************************************
  ngOnInit(): void {
    this.getTodos();
  }

  add(): void {
    this.openAddDialog().afterClosed().subscribe(result => {
      if (result) {
        const { title, description, assignTo, deadline } = result;
        this.addTodo(title, description, assignTo, deadline);
        this.snackBar.open(snack.todo.add, snack.undo);
      }
    });
  }

  edit(todo: any): void {
    const { position, title, description, state_name, user_name, deadline } = todo;
    this.editIndexId = position;
    this.openEditDialog(title, state_name, description, user_name, deadline).afterClosed().subscribe(result => {
      if (result) {
        this.editData(result);
        this.snackBar.open(snack.todo.edit, snack.undo);
      }
    });
  }

  delete(id: number): void {
    this.openDeleteDialog().afterClosed().subscribe(result => {
      if (result) {
        this.deleteTodo(id);
        this.snackBar.open(snack.todo.delete, snack.undo);
      }
    });
  }
  
  addUser(): void {
    this.openAddUserDialog();
  }

  openUsersList() {
    this.openUsersListDialog().afterClosed().subscribe(() => {
      this.getTodos();
    });
  }

  deleteAll() {
    this.openDeleteDialog().afterClosed().subscribe(result => {
      if(result) {
        this.deleteAllTodos();
        this.unpaginatedTodos = [];
      }
    })
  }
//*************************************************** End of main methods *****************************************************

//*************************************************** Open dialogs methods ****************************************************
  openEditDialog(title: string, state: string, description: string, user: string, deadline: string): any {
    return this.dialog.open(DialogEditComponent, {
      width: editDialog.width,
      data: {
        dialogTitle: editDialog.editTitle,
        okText: editDialog.editOkText,
        title,
        state,
        description,
        assignTo: user,
        deadline,
      }
    });
  }

  openDeleteDialog(): any {
    return this.dialog.open(DialogDeleteComponent, {
      width: dialog.deleteTodo.width,
      data: { 
        isDelete: true 
      }
    });
  }

  openAddDialog(): any {
    return this.dialog.open(DialogEditComponent, {
      width: editDialog.width,
      data: {
        dialogTitle: editDialog.addTitle,
        okText: editDialog.addOkText,
        title: '',
        description: '',
        assignTo: '',
        deadline: '',
        states: '',
      }
    });
  }

  openAddUserDialog(): any {
    return this.dialog.open(DialogAddUserComponent, {
      width: dialog.addUser.width,
    });
  }

  openUsersListDialog(): any {
    return this.dialog.open(DialogShowUsersComponent, {
      width: dialog.openUsers.width,
      height: dialog.openUsers.height
    });
  }
//******************************************************** End of dialogs methods **********************************************

//**************************************************** Methods for filtration ***************************************************
  chooseFilter(filter: string) {
    this.filterString = filter;
  }

  applyFilter(event: any): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.todos.filter = filterValue.trim().toLowerCase();
    this.todos.filterPredicate = (data, filter: string) => {
      return data[this.columns[this.columnsHeaders.indexOf(this.filterString) + 1]].toLowerCase().includes(filter);
    }
  }
//************************************************** End of methods for filtation ************************************************

//******************************************************* Methods to get main data ***********************************************
  getTodos(): void {
    this.http.get(`${routes.serverURL}/${routes.getTodos}`).subscribe(allTodos => {
      this.createPagination(allTodos);
      this.todos.sort = this.sort;
    });
  }
//*********************************************** End of methods to get main data ***************************************************

//*********************************************** Methods to post data through http *********************************************
  addTodo(title: string, description: string, name, deadline: any): void {
    this.http.post(`${routes.serverURL}/${routes.addTodo}`, {
      title,
      description,
      assigned_to: name.user_name,
      deadline: new Date(deadline.getTime() + 60 * 60 * 24 * 1000)
    }).subscribe(allTodos => {
      this.createPagination(allTodos);
    })
  }

  editData(result: any): void {
    const todo = this.todos.filteredData[this.editIndexId];
    const day = 24 * 60 * 60 * 1000;
    this.http.post(`${routes.serverURL}/${routes.updateTodo}`, {
      id: todo.id,
      deadline: typeof(result.deadline) === 'string' ? result.deadline : new Date(result.deadline.getTime() + day) || todo.date,
      title: result.title || todo.title,
      description: result.description || todo.description,
      state: result.state || todo.state_name,
      assigned_to: result.assignTo.user_name || todo.assigned_to.user_name
    }).subscribe(allTodos => {
      this.createPagination(allTodos);
      this.todos.sort = this.sort;
    });
  }

  deleteTodo(id: number): void {
    this.http.post(`${routes.serverURL}/${routes.deleteTodo}`, {todoId: id}).subscribe(allTodosWithoutDeleted => {
      this.createPagination(allTodosWithoutDeleted);
      this.todos.sort = this.sort;
    });
  }

  deleteAllTodos(): void {
    this.http.get(`${routes.serverURL}/${routes.deleteAllTodos}`).subscribe(() => {
      this.todos = [];
    });
  }
//********************************************* End of methods to post data through http **************************************

//*********************************************************** Other methods *******************************************************
  createPagination(data: any): void {
    this.unpaginatedTodos = data;
    for (let i = 0; i < data.length; i++) {
      data[i].position = i;
      data[i].deadline = data[i].deadline.split('T')[0];
    }
    this.todos = new MatTableDataSource(data);
    this.todos.paginator = this.paginator;
  }
}
//****************************************************** End of other methods ********************************************************