import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/_services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  service: ContactService;
  constructor(private serv: ContactService) { this.service = serv; }

  ngOnInit() {
  }

}
