import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class DashboardService {
  searchHistoryRef: any;
  items:Array<string>;
  constructor(
    private loginService: LoginService,private db: AngularFireDatabase)
     {
    this.searchHistoryRef = this.db.list(`currentSession/${this.loginService.userUid}/searchHistory`);
    }

  getHistory() {
    return this.searchHistoryRef.valueChanges();
  }

  
  searchName(wikiSearch: string)
   {

    console.log(wikiSearch+'in the searchName function');
    
     }

  addToHistory(items: Array<string>) {
    var search = items;
    this.db.object(`currentSession/${this.loginService.userUid}/searchHistory`)
    .update({[Date.now()]: search});
  }
}
