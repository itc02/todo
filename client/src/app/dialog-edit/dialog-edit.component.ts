import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { angularComponent, dialog } from '../../config/constants';
import { HttpClient } from '@angular/common/http';
import { routes, verification } from '../../config/constants';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

interface User {
  id: number,
  user_name: string
}

interface Todo {
  state: string;
  dialogTitle: string;
  title: string;
  description: string;
  assignTo: any;
  deadline: string;
  okText: string;
}

@Component({
  templateUrl: angularComponent.templateUrl.dialogEdit,
  styleUrls: angularComponent.styleUrls.dialogEdit
})

export class DialogEditComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Todo,
    private http: HttpClient
  ) {}

  states: any
  users: any;
  user: string;
  filteredOptions: Observable<User[]>;
  control = new FormControl();
  initialDeadline = this.data.deadline;
  titleMaxLength = verification.title.length;
  descriptionMaxLength = verification.description.length;
  descriptionRows = verification.description.rows;

//************************************************** Main methods ******************************************
  ngOnInit(): void {
    console.log(this.data.state)
    this.getStates();
    this.getUsers();
  }

  getUsers(): void {
    this.http.get(`${routes.serverURL}/${routes.getUsers}`).subscribe(allUsers => {
      this.users = allUsers;
      this.filteredOptions = this.control.valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.user_name),
        map(name => name ? this._filter(name) : this.users.slice())
      );
      this.control.setValue({user_name: this.data.assignTo === dialog.editUsers.deletedUserSign ? '' : this.data.assignTo})
    });
  }

  getStates(): void {
    this.http.get(`${routes.serverURL}/${routes.getStates}`).subscribe(allStates => {
      this.states = allStates;
    });
  }
//*********************************************** End of main methods ********************************************

//******************************************* Methods for data verification *****************************************
  isDataValid(): boolean {
    return (
      this.isTitileValid() &&
      this.isDeadlineValid() &&
      this.isUsernameValid() &&
      this.isDescriptionValid()
    )
  }

  isTitileValid(): boolean {
    return this.data.title && this.data.title.length <= this.titleMaxLength;
  }

  isDeadlineValid(): boolean {
    return this.data.deadline && true;
  }
  
  isUsernameValid(): boolean {
    if(!this.users) return false;
    return this.users.map(user => user.user_name).indexOf(this.user) >= 0 || this.data.assignTo.user_name;
  }

  isDescriptionValid(): boolean {
    return this.data.description && this.data.description.length <= this.descriptionMaxLength;
  }
  
  onInput(event): void {
    this.user = event.target.value;
  }
//******************************************** Methods for autocomplete *****************************************
  setValue(user: string) {
    this.control.setValue({user_name: user})
  }

  _filter(name: string): User[] {
    const filterValue = name.toLowerCase();
    return this.users.filter(option => option.user_name.toLowerCase().indexOf(filterValue) === 0);
  }

  displayFn(user: User): string {
    return user && user.user_name ? user.user_name : '';
  }
//***************************************** End of methods for autocomplete *********************************************

//Close dialog
  cancel(): void {
    this.dialogRef.close();
  }

}
