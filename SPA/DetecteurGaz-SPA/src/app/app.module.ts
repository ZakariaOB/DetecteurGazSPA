import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users/users.component';
import { UserService } from './_services/user.service';
import { UserListComponent } from './users/user-list/user-list.component';
import { PagerService } from './_services/pager.service';
import { ContactComponent } from './contacts/contact/contact.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactsComponent } from './contacts/contacts/contacts.component';
import { DetectorService } from './_services/detector.service';
import { RouterModule } from '@angular/router';
import { appRoutes } from 'src/routes';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UsersComponent,
    UserListComponent,
    ContactComponent,
    ContactListComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService, PagerService, DetectorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
