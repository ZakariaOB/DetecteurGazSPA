import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/_services/contact.service';
import { DetectorService } from 'src/app/_services/detector.service';
import { Contact } from 'src/app/models/contact';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  service: ContactService;
  user: User;
  constructor(private serv: ContactService,
              private userService: UserService,
              private detectorService: DetectorService,
              private route: ActivatedRoute) { this.service = serv; }

  ngOnInit() {
    this.loadContactList();
  }

  populateForm(contact: Contact) {
    this.service.selectedContact = Object.assign({}, contact);
  }

  onEditcontact(contact) {
    this.service.selectedContact = Object.assign({}, contact);
  }

  loadContactList() {
    const idLiteral = 'id';
    const key = this.route.snapshot.params[idLiteral];
    const user = this.userService.allItems.find(u => u.Key === key);
    if (user) {
      this.user = user;
    }
    this.service.refreshList(key);
  }

  updateContact() {
    this.service.updateSelectedContact();
  }
}
