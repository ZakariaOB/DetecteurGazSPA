import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users/users.component';
import { UserService } from './_services/user.service';
import { UserListComponent } from './users/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UsersComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
