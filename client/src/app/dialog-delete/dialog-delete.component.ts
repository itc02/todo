import { Component, Inject } from '@angular/core';
import { angularComponent, deleteDialog } from '../../config/constants';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
@Component({
  styleUrls: angularComponent.styleUrls.dialogDelete,
  templateUrl: angularComponent.templateUrl.dialogDelete,
})
export class DialogDeleteComponent {

  constructor(public dialogRef: MatDialogRef<DialogDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: {isDelete: boolean}) {}

  cancel(): void {
    this.dialogRef.close();
  }
}