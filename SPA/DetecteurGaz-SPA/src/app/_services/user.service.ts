import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable()
export class UserService {

    selectedUser: User;
    userList: User[];
    constructor() { }

    refreshList() {
        this.userList = new Array();
        const u1 = new User();
        u1.FirstName = 'Mohamed';
        u1.LastName = 'boukhris';
        u1.Address = 'Massira 1';
        u1.PhoneNumber = '+21266617571';

        const u2 = new User();
        u2.FirstName = 'Zakaria';
        u2.LastName = 'Torrrr';
        u2.Address = 'Mitabv';
        u2.PhoneNumber = '+21266617571';

        this.userList.push(u1);
        this.userList.push(u2);
        this.userList.push(u1);
        this.userList.push(u2);
        this.userList.push(u1);
        this.userList.push(u2);

        
        this.selectedUser = this.userList[0];
    }

}
