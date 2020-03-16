import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { angularComponent } from '../../config/constants';

interface Todo {
  dialogTitle: string,
  title: string,
  description: string,
  assignTo: string,
  deadline: string,
  control: any,
  displayFn: any,
  filteredOptions: any,
  okText: string
}

@Component({
  templateUrl: angularComponent.templateUrl.dialogEdit,
  styleUrls: angularComponent.styleUrls.dialogEdit
})

export class DialogEditComponent {

  constructor(public dialogRef: MatDialogRef<DialogEditComponent>, @Inject(MAT_DIALOG_DATA) public data: Todo) {}
  
  cancel(): void {
    this.dialogRef.close();
  }
}
