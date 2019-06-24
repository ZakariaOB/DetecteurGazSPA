import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { PagerService } from './pager.service';
import { VArray } from '../_helper/ArrayHelper';
import { Contact } from '../models/contact';
import { Capteur } from '../models/capteur';

@Injectable()
export class UserService extends PagerService<User> {
    selectedUser: User;
    dataUser: Array<User>;
    contactList: Array<Contact> = new Array<Contact>();
    capteurList: Array<Capteur> = new Array<Capteur>();

    constructor() {
        super();
        this.dataUser = new Array<User>();
    }

    refreshList() {
        const range = VArray.range(0, 10, 1);
        let i = 1;
        if (this.dataUser.length === 0) {
            range.forEach(el => {
                const u = new User();
                u.Id = i++;
                u.FirstName = 'Mohamed_' + i;
                u.LastName = 'boukhris_' + i;
                u.Address = 'Massira_' + i;
                u.PhoneNumber = '+2369911';
                u.Email = 'mo@gmail.com';
                this.dataUser.push(u);
                this.addContactListDummy(u.Id);
                this.addCapteurListDummy(u.Id);
            });
        }

        this.selectedUser = this.dataUser[0];
        this.allItems = this.dataUser;
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

    addCapteurListDummy(userId) {
        const range = VArray.range(0, 20, 1);
        let i = 1;
        range.forEach(el => {
            const u = new Capteur();
            u.Id = i++;
            u.SensorValue = 50;
            u.Status = (i % 3 === 0) ? 'High' : 'Normal';
            u.StatusAlert = (u.Status === 'High');
            u.ValueDate = new Date();
            u.UserId = userId;
            this.capteurList.push(u);
        });
    }
}
