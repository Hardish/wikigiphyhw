import { HttpClient,HttpParams } from '@angular/common/http';

import { HttpHeaders } from "@angular/common/http";
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 import { map } from "rxjs/operators";


@Injectable()
export class GiphyService {
  handleError(arg0: any): any {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }
  search(link: any) 
  {
       return this.http.get(link).map(res => res);
  }
  
}