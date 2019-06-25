import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  service: UserService;
  userFireBaseData: any[];

  constructor(private serv: UserService) { this.service = serv; }

  ngOnInit() {
    this.service.refreshList();
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

  onEditUser(user) {
    this.service.selectedUser = Object.assign({}, user);
  }

  updateUser() {
    this.service.updateSelectedUser();
  }
}
