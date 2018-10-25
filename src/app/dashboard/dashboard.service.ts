import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class DashboardService {
  searchHistoryRef: any;

  constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase) {
    this.searchHistoryRef = this.db.list(`currentSession/${this.loginService.userUid}/searchHistory`);
  }

  getHistory() {
    return this.searchHistoryRef.valueChanges();
  }

  addflName(firstName: string, lastName: string) {
    const nam: any = {};
    if (firstName) {
      nam[`firstNames/${firstName}`] = true;
    }
    if (lastName) {
      nam[`lastNames/${lastName}`] = true;
    }
    return this.db.database.ref().update(nam);
  }

  searchName(firstName: string, lastName: string) {
    return this.db.object(`/firstNames/${firstName}`).valueChanges().pipe(
      mergeMap(
        _ => this.db.object(`lastNames/${lastName}`).valueChanges(),
        (first, last) => {
          if (first && last) {
            return true;
          }
         
        }
      )
    )
  }

  addToHistory(firstName: string, lastName: string) {
    var search = firstName + " " + lastName;
    this.db.object(`currentSession/${this.loginService.userUid}/searchHistory`)
    .update({[Date.now()]: search});
  }
}
