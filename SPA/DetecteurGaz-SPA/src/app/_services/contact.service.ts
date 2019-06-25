import { Injectable } from '@angular/core';
import { PagerService } from './pager.service';
import { Contact } from '../models/contact';
import { UserService } from './user.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Constants } from 'src/constantes';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends PagerService<Contact> {
  selectedContact: Contact;

  constructor(private userService: UserService, private db: AngularFireDatabase) {
    super();
  }

  refreshList(userKey) {
    let firsbasedata: any[];
    this.db.list(Constants.FireBaseDbContactNode)
      .snapshotChanges()
      .subscribe(changes => {
        firsbasedata = changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        this.allItems = this.mapFromFireBase(firsbasedata).filter(h => h.UserKey === userKey);
        if (this.allItems) {
          this.selectedContact = this.allItems[0];
        }
        this.setPage(1);
      });
  }

  mapFromFireBase(contacts: any[]) {
    if (contacts) {
      return contacts.map(u => this.mapContact(u));
    }
    return new Array<Contact>();
  }

  mapContact(contact) {
    const result = new Contact();
    if (contact) {
      result.Address = contact[Constants.Address];
      result.Email = contact[Constants.Email];
      result.Key = contact[Constants.Key];
      result.LastName = contact[Constants.LastName];
      result.FirstName = contact[Constants.FirstName];
      result.PhoneNumber = contact[Constants.PhoneNumber];
      result.UserKey = contact[Constants.UserKey];
    }
    return result;
  }

  updateSelectedContact() {
    if (this.selectedContact) {
      const key = this.selectedContact.Key;
      this.db.object(Constants.FireBaseDbContactNode + '/' + key).update({
        FirstName: this.selectedContact.FirstName,
        LastName: this.selectedContact.LastName,
        Email: this.selectedContact.Email,
        PhoneNumber: this.selectedContact.PhoneNumber,
        Address: this.selectedContact.Address
      });
    }
  }
}
