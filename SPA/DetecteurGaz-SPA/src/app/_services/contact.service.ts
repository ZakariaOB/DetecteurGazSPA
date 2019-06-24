import { Injectable } from '@angular/core';
import { PagerService } from './pager.service';
import { Contact } from '../models/contact';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends PagerService<Contact> {
  selectedContact: Contact;

  constructor(private userService: UserService) {
    super();
  }

  refreshList(userId) {
    this.userService.refreshList();
    this.allItems = this.userService.contactList.filter(i => i.UserId === userId);
    this.setPage(1);
  }
}
