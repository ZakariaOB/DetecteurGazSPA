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
    this.loadContact();
  }

  populateForm(contact: Contact) {
    this.service.selectedContact = Object.assign({}, contact);
  }

  onDelete(id: number) {
    /*
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteEmployee(id).subscribe(res => {
        this.service.refreshList();
        this.toastr.warning('Deleted successfully', 'EMP. Register');
      });
    }*/
  }

  onEditcontact(contact) {
    this.service.selectedContact = contact;
  }

  loadContact() {
    const idLiteral = 'id';
    const userId = this.route.snapshot.params[idLiteral];
    const user = this.userService.allItems.find(u => u.Id === +userId);
    if (user) {
      this.user = user;
    }
    this.service.refreshList(+userId);
  }
}
