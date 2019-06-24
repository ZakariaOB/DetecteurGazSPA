import { Injectable } from '@angular/core';
import { PagerService } from './pager.service';
import { Capteur } from '../models/capteur';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CapteurService extends PagerService<Capteur> {

  constructor(private userService: UserService) {
    super();
  }
  refreshList(userId) {
    this.userService.refreshList();
    this.allItems = this.userService.capteurList.filter(i => i.UserId === userId);
    this.setPage(1);
  }

}
