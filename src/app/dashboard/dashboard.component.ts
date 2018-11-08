import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { DashboardService } from './dashboard.service';
import { Subject } from 'rxjs';
import { WikipediaSearchService } from '../wikipedia-search.service';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import { GiphyService } from '../giphy-search.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searches: any[];
  wikiSearch: string;
  items:Array<string>;
  links:Array<string>;
  term$ = new Subject<string>();
  
  result: any;
  // searchInput: string;
  searchUrl = 'https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=';

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private service:WikipediaSearchService,
    private giphyservice:GiphyService
    )
     {
      this.term$
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.service.search(term))
      .subscribe(results => [
        this.items= results[1],
        this.links= results[3],
        console.log(this.items)
      ]);
    this.searches = [];
  }

  onSearchName() {
    console.log("search for : " + this.wikiSearch);
    if (this.wikiSearch ) {
      this.dashboardService.addToHistory(this.items);
      this.dashboardService.searchName(this.wikiSearch);
      const apiLink = this.searchUrl + this.wikiSearch + '&limit=10';
      this.giphyservice.search(apiLink).subscribe(
        (data: any) => this.result = data
      )
    }


    return false;
  }

  

  searchHistory() {
    this.dashboardService.getHistory().subscribe( (history: any) => {
      this.searches = history;
    });
  }
  
  ngOnInit() {
  }

}
