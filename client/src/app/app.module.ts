import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { MainTableComponent } from './main-table/main-table.component';
import { UsersComponent } from './users/users.component';
import { AddComponent } from './add/add.component';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full'},
    { path: 'main', component: MainTableComponent},
    { path: 'add', component: AddComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        MainTableComponent,
        UsersComponent,
        AddComponent,
        DialogDeleteComponent
    ],
    imports: [
        RouterModule.forRoot(
            appRoutes,
        ),
        MatTableModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatMenuModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatPaginatorModule,
        MatDialogModule,
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule
    ],
    entryComponents: [
      DialogDeleteComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
