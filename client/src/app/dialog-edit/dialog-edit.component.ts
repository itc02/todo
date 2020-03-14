import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

interface Todo {
  title: string,
  description: string,
  assignTo: string,
  deadline: string,
  control: any,
  displayFn: any,
  filteredOptions: any
}

@Component({
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.css']
})

export class DialogEditComponent {

  constructor(public dialogRef: MatDialogRef<DialogEditComponent>, @Inject(MAT_DIALOG_DATA) public data: Todo) {}

  ngOnInit(): void {
  }
  cancel(): void {
    this.dialogRef.close();
  }
}
