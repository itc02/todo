import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { angularComponent, routes, snack } from '../../config/constants';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: angularComponent.templateUrl.dialogShowUsers,
  styleUrls: angularComponent.styleUrls.dialogShowUsers
})
export class DialogShowUsersComponent implements OnInit {

  constructor(
    private http: HttpClient, 
    public dialogRef: MatDialogRef<DialogShowUsersComponent>,
    private snackBar: MatSnackBar
  ) { }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  users: any = [];
  selection = new SelectionModel(true, [])
  columns = ['select', 'name'];

  ngOnInit() {
    this.http.get(`${routes.serverURL}/${routes.getUsers}`).subscribe(allUsers => {
      // @ts-ignore
      this.users = new MatTableDataSource(allUsers);
      this.users.paginator = this.paginator;
    })
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.users.filteredData && this.users.filteredData.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.users.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
  }

  delete() {
    this.http.post(`${routes.serverURL}/${routes.deleteUsers}`, {
      IDs: this.selection.selected.map(row => row.id)
    }).subscribe(allUsersWithoutDeleted => {
      // @ts-ignore
      this.users = new MatTableDataSource(allUsersWithoutDeleted);
      this.users.paginator = this.paginator;
      this.snackBar.open(snack.user.delete, snack.undo);
    });
  }

  isUserSelected(): boolean {
    return this.selection.selected.length > 0
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
