import { Component, OnInit } from '@angular/core';
import { HistoryService } from './history.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  searchHistory: any[];

  constructor(private historyService: HistoryService,private router: Router) { 
    this.historyService
    .getSearchHistory()
    .subscribe(search => {
      this.searchHistory = search;
      console.log(search);
    });
 }

  ngOnInit() {
  }

}
