import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetNewsService {

  constructor(private httpService:HttpClient) { }

  apyKey="K37Y17GG58VDHGBT";
  getNews():Observable<any>{
    let news=this.httpService.get("https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=earnings&apikey="+this.apyKey);
    return news
  }
}
