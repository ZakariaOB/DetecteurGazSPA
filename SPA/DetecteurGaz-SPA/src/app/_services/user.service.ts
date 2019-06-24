import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { PagerService } from './pager.service';
import { VArray } from '../_helper/ArrayHelper';
import { Contact } from '../models/contact';

@Injectable()
export class UserService extends PagerService<User> {
    selectedUser: User;
    userList: User[];
    contactList: Array<Contact> = new Array<Contact>();

    constructor() {
        super();
    }

    refreshList() {
        const dataUser = new Array<User>();
        const range = VArray.range(0, 25, 1);
        let i = 1;
        range.forEach(el => {
            const u = new User();
            u.Id = i++;
            u.FirstName = 'Mohamed_' + i;
            u.LastName = 'boukhris_' + i;
            u.Address = 'Massira__' + i;
            u.PhoneNumber = '+2369911';
            u.Email = 'mo@gmail.com';
            dataUser.push(u);
            this.addContactListDummy(u.Id);
        });

        this.selectedUser = dataUser[0];
        this.allItems = dataUser;
        this.setPage(1);
    }

    addContactListDummy(userId) {
        const range = VArray.range(0, 5, 1);
        let i = 1;
        range.forEach(el => {
            const u = new Contact();
            u.Id = i++;
            u.FirstName = 'Zakaria_' + i;
            u.LastName = 'boukhris_' + i;
            u.Address = 'Massira__' + i;
            u.PhoneNumber = '+2369911';
            u.Email = 'BOUKHE@gmail.com';
            u.UserId = userId;
            this.contactList.push(u);
        });
    }
}
