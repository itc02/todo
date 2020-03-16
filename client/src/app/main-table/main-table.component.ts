import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { routes, angularComponent, deleteDialog, editDialog } from '../../config/constants';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';


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
  columns = ['actions', 'title', 'name', 'deadline'];
  filterBy = ['Title', 'Name', 'Deadline'];
  disabledBgColor: object = { backgroundColor: '#fafafa', color: 'rgba(0,0,0,.26)'};
  transparentBgColor: object = { backgroundColor: 'transparent', color: 'black' };
  disabledRowsId: number[] = [];
  editIndexId = 0;
  rowsInOnePage = [5, 10];
  isDelete = true;
  control = new FormControl();
  filteredOptions: Observable<User[]>;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  constructor(private http: HttpClient, private dialog: MatDialog) { }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  // Main methods
  ngOnInit(): void {
    this.getTodos();
    this.getUsers();
  }

  add(): void {
    this.openAddDialog().afterClosed().subscribe(result => {
      if(result) {
        const { title, description, assignTo, deadline } = result;
        this.addTodo(title, description, assignTo, deadline);
      }
    })
  }

  edit(index: number, title: string, description: string, user: string, deadline: string, isDisabled: boolean): void {
    if (!isDisabled) {
      this.http.get(`${routes.serverURL}/${routes.getUsers}`).subscribe(allUsers => {
        this.users = allUsers;
        this.editIndexId = index;
      });
      this.openEditDialog(title, description, user, deadline).afterClosed().subscribe(result => {
        if(result) {
          this.editData(result);
        }
      });
    }
  }

  delete(id: number): void {
    this.openDeleteDialog().afterClosed().subscribe(result => {
      if (result) {
        this.deleteTodo(id);
      }
    });
  }

  disable(id: number): void {
    this.handleTodoForDisabling(id);
    this.disableTodo(id);
  }

  openTodo(): void {
    
  }
  // Helpers
  getTodos(): void {
    this.http.get(`${routes.serverURL}/${routes.getTodos}`).subscribe(allTodos => {
      this.createPagination(allTodos);
      this.fillDisabledRowsIdArray(allTodos);
      this.todos.sort = this.sort;
    });
  }

  getUsers(): void {
    this.http.get(`${routes.serverURL}/${routes.getUsers}`).subscribe(allUsers => {
      this.users = allUsers;
      this.filteredOptions = this.control.valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.users.slice())
      );
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

  fillDisabledRowsIdArray(data: any) {
    this.disabledRowsId = data.map(item => {
      if (item.is_disabled) {
        return item.id;
      }
    });
  }

  applyFilter(event: any): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.todos.filterPredicate  = filterValue.trim().toLowerCase();
  }
  
  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  _filter(name: string): User[] {
    const filterValue = name.toLowerCase();
    return this.users.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  openEditDialog(title: string, description: string, user: string, deadline: string): any {
    return this.dialog.open(DialogEditComponent, {
      width: editDialog.width,
      data: {
        dialogTitle: editDialog.editTitle,
        okText: editDialog.editOkText,
        title, 
        description, 
        assignTo: user, 
        deadline,
        control: this.control,
        displayFn: this.displayFn,
        filteredOptions: this.filteredOptions
      }
    })
  }

  editData(result): void {
    const todo = this.todos.filteredData[this.editIndexId];
    this.http.post(`${routes.serverURL}/${routes.updateTodo}`, {
      id: todo.id,
      deadline: result.deadline || todo.date,
      title: result.title || todo.title,
      description: result.description || todo.description,
      assigned_to: result.assignTo || todo.assigned_to
    }).subscribe(allTodos => {
      this.createPagination(allTodos);
    });
  }

  openDeleteDialog(): any {
    return this.dialog.open(DialogDeleteComponent, {
      width: deleteDialog.width,
      data: {isDelete: this.isDelete }
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
        control: this.control,
        displayFn: this.displayFn,
        filteredOptions: this.filteredOptions
      }
    })
  }

  deleteTodo(id: number): void {
    this.http.post(`${routes.serverURL}/${routes.deleteTodo}`, {todoId: id}).subscribe(allTodosWithoutDeleted => {
      this.createPagination(allTodosWithoutDeleted);
    });
  }

  disableTodo(id: number): void {
    this.http.post(`${routes.serverURL}/${routes.disableTodo}`, {
      id,
      is_disabled: this.disabledRowsId.indexOf(id) >= 0
    }).subscribe(allTodos => {
      this.createPagination(allTodos);
    });
  }

  handleTodoForDisabling(id:number): void {
    const index = this.disabledRowsId.indexOf(id);
    if (index === -1) {
      this.disabledRowsId.push(id);
    } else {
      this.disabledRowsId.splice(index, 1);
    }
  }

  addTodo(title: string, description: string, name: string, deadline: any): void {
    this.http.post(`${routes.serverURL}/${routes.addTodo}`, {
      title,
      description,
      name,
      deadline
    }).subscribe(allTodos => {
      this.createPagination(allTodos);
    })
  }
}
