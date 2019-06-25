import { Injectable } from '@angular/core';
import { PagerService } from './pager.service';
import { Capteur } from '../models/capteur';
import { UserService } from './user.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Constants } from 'src/constantes';

@Injectable({
  providedIn: 'root'
})
export class CapteurService extends PagerService<Capteur> {

  constructor(private userService: UserService, private db: AngularFireDatabase) {
    super();
  }

  refreshList(userKey) {
    let firsbasedata: any[];
    this.db.list(Constants.FireBaseDbCapteurNode)
      .snapshotChanges()
      .subscribe(changes => {
        firsbasedata = changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        this.allItems = this.mapFromFireBase(firsbasedata).filter(h => h.UserKey === userKey);
        this.setPage(1);
      });
  }

  mapFromFireBase(capteurs: any[]) {
    if (capteurs) {
      return capteurs.map(u => this.mapCapteur(u));
    }
    return new Array<Capteur>();
  }

  mapCapteur(capteur) {
    const result = new Capteur();
    if (capteur) {
      result.SensorValue = capteur[Constants.SensorValue];
      result.Status = capteur[Constants.Status];
      result.UserKey = capteur[Constants.UserKey];
      result.ValueDate = capteur[Constants.ValueDate];
      result.StatusAlert = (result.Status === 'High');
    }
    return result;
  }
}
