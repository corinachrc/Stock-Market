import { Component } from '@angular/core';
import { GetNewsService } from 'src/app/services/get-news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  listOfArticle:any[]=[];
  displayArticle:boolean=false;


  constructor(private getNews:GetNewsService){}
  ngOnInit():void{
    for(let i=0;i<2;i++){
      this.getNews.getNews().subscribe((response)=>{
        this.listOfArticle[i]=response["feed"][i]

      })
    }

    setInterval(()=>{
      this.listOfArticle=[];
      for(let i=0;i<2;i++){
        this.getNews.getNews().subscribe((response)=>{
          this.listOfArticle[i]=response["feed"][i]

        })
      }
    },1000*30)}
}
