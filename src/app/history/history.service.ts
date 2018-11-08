import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class HistoryService {
  searchHistoryRef: any;
  constructor(private loginService: LoginService,
    private db: AngularFireDatabase)
     {

      
      }

    
    getSearchHistory() {
      console.log(this.loginService.userUid);
    return this.db.list(`currentSession/${this.loginService.userUid}/searchHistory`).valueChanges();
  }

}
