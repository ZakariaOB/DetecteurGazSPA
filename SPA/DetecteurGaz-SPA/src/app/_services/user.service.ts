import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { PagerService } from './pager.service';
import { VArray } from '../_helper/ArrayHelper';
import { Contact } from '../models/contact';
import { Capteur } from '../models/capteur';
import { AngularFireDatabase } from 'angularfire2/database';
import { Constants } from 'src/constantes';

@Injectable()
export class UserService extends PagerService<User> {
    selectedUser: User;
    dataUser: Array<User>;
    contactList: Array<Contact> = new Array<Contact>();
    capteurList: Array<Capteur> = new Array<Capteur>();

    constructor(private db: AngularFireDatabase) {
        super();
        this.dataUser = new Array<User>();
    }

    getUsersFireList() {
        return this.db.list(Constants.FireBaseDbUserNode).snapshotChanges();
    }

    mapFromFireBase(users: any[]) {
        if (users) {
            return users.map(u => this.mapUserFireBaseToUser(u));
        }
        return new Array<User>();
    }

    mapUserFireBaseToUser(user) {
        const userMapped = new User();
        if (user) {
            userMapped.Address = user[Constants.Address];
            userMapped.Email = user[Constants.Email];
            userMapped.Key = user[Constants.Key];
            userMapped.LastName = user[Constants.LastName];
            userMapped.FirstName = user[Constants.FirstName];
            userMapped.PhoneNumber = user[Constants.PhoneNumber];
        }
        return userMapped;
    }

    refreshList() {
        let firsbasedata: any[];
        this.db.list(Constants.FireBaseDbUserNode)
            .snapshotChanges()
            .subscribe(changes => {
                firsbasedata = changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
                this.allItems = this.mapFromFireBase(firsbasedata);
                this.setPage(1);

                if (this.allItems) {
                    this.selectedUser = this.allItems[0];
                }
            });
    }

    updateSelectedUser() {
        if (this.selectedUser) {
            const key = this.selectedUser.Key;
            this.db.object(Constants.FireBaseDbUserNode + '/' + key).update({
                FirstName: this.selectedUser.FirstName,
                LastName: this.selectedUser.LastName,
                Email: this.selectedUser.Email,
                PhoneNumber: this.selectedUser.PhoneNumber,
                Address: this.selectedUser.Address
            });
        }
    }

    refreshListDummy() {
        const range = VArray.range(0, 5, 1);
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
            });
        }

        // users
        const fireBaseDbUserNode = this.db.list(Constants.FireBaseDbUserNode);
        this.dataUser.forEach(u => {
            fireBaseDbUserNode.push({
                FirstName: u.FirstName,
                LastName: u.LastName,
                Email: u.Email,
                PhoneNumber: u.PhoneNumber,
                Address: u.Address,
                UserId: u.Id
            });
        });

        // Using the updated key for contacts and capteurs
        this.db.list(Constants.FireBaseDbUserNode)
            .snapshotChanges()
            .subscribe(changes => {
                const x = changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
                const allItems = this.mapFromFireBase(x);
                if (this.contactList.length === 0 && this.capteurList.length === 0) {
                    allItems.forEach(u => {
                        this.addContactListDummy(u.Key);
                        this.addCapteurListDummy(u.Key);
                    });

                    // contacts
                    const fireBaseDbContactNode = this.db.list(Constants.FireBaseDbContactNode);
                    this.contactList.forEach(u => fireBaseDbContactNode.push({
                        FirstName: u.FirstName,
                        LastName: u.LastName,
                        Email: u.Email,
                        PhoneNumber: u.PhoneNumber,
                        Address: u.Address,
                        UserKey: u.UserKey
                    }));

                    // capteurs
                    const fireBaseDbCapteurNode = this.db.list(Constants.FireBaseDbCapteurNode);
                    this.capteurList.forEach(u => fireBaseDbCapteurNode.push({
                        SensorValue: u.SensorValue,
                        Status: u.Status,
                        ValueDate: u.ValueDate.toDateString(),
                        UserKey: u.UserKey
                    }));
                }
            });

    }

    addContactListDummy(userKey) {
        const range = VArray.range(0, 2, 1);
        let i = 1;
        range.forEach(el => {
            const u = new Contact();
            u.Id = i++;
            u.FirstName = 'Zakaria_' + i;
            u.LastName = 'boukhris_' + i;
            u.Address = 'Massira__' + i;
            u.PhoneNumber = '+2369911';
            u.Email = 'BOUKHE@gmail.com';
            u.UserKey = userKey;
            this.contactList.push(u);
        });
    }

    addCapteurListDummy(userKey) {
        const range = VArray.range(0, 5, 1);
        let i = 1;
        range.forEach(el => {
            const u = new Capteur();
            u.Id = i++;
            u.SensorValue = 50;
            u.Status = (i % 3 === 0) ? 'High' : 'Normal';
            u.StatusAlert = (u.Status === 'High');
            u.ValueDate = new Date();
            u.UserKey = userKey;
            this.capteurList.push(u);
        });
    }
}
