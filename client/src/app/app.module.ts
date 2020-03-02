import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MainTableComponent } from './main-table/main-table.component';
import { UsersComponent } from './users/users.component';
import { AddComponent } from './add/add.component';

const appRoutes: Routes = [
    { path: 'main', component: MainTableComponent},
    { path: 'add', component: AddComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        MainTableComponent,
        UsersComponent,
        AddComponent
    ],
    imports: [
        RouterModule.forRoot(
            appRoutes,
        ),
        BrowserModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    
}
