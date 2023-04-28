import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetPricesService {

  constructor(private httpService:HttpClient) { }

  apyKey="K37Y17GG58VDHGBT";
  getStockPrices(symbol:string):Observable<any>{
    let response=this.httpService.get("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+symbol+"&interval=5min&apikey="+this.apyKey);
    return response
  }
}
