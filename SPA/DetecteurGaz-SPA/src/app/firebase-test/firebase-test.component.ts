import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase} from 'angularfire2/database';
import { Constants } from 'src/constantes';

@Component({
  selector: 'app-firebase-test',
  templateUrl: './firebase-test.component.html',
  styleUrls: ['./firebase-test.component.css']
})
export class FirebaseTestComponent implements OnInit {

  users: any[];
  constructor(db: AngularFireDatabase) {
    db.list(Constants.FireBaseDbUserNode).valueChanges().subscribe(u => {
      this.users = u;
      console.log(this.users[0]);
    });
  }

  ngOnInit() {
  }

}
