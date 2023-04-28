import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {


  constructor(private httpService:HttpClient) { }

  apyKey="K37Y17GG58VDHGBT";
  searchSymbol(symbol:string):Observable<any>{
    let searching=this.httpService.get("https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords="+symbol+"&apikey"+this.apyKey);
    return searching
  }
}
