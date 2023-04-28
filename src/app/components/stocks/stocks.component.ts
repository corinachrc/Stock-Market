
import { StockPrices } from './../../models/stock-prices';
import { Component } from '@angular/core';
import { SearchingList } from 'src/app/models/searching-list';


import { GetPricesService } from 'src/app/services/get-prices.service';
import { SearchService } from 'src/app/services/search.service';




@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent {
  listOfSymbols: any[] = ["MSFT", "GOOGL", "ABIO", "ABNB", "ABST", "ACER", "ADBE"];
  selectedSymbols: any[] = []
  lastRefreshed: string = ""
  stockPrices: StockPrices = {
    "0. symbol": "",
    "1. open": "",
    "2. high": "",
    "3. low": "",
    "4. close": "",
    "5. volume": "",
    "6. refresh":""
  }
  threeStocks: StockPrices[] = []


  constructor(private getStockService: GetPricesService,private searchSymbol:SearchService) { }
  ngOnInit(): void {
    let i = 0;
    let j = Math.floor(Math.random() * (this.listOfSymbols.length - 1))

    while (this.selectedSymbols.length < 2) {
      if (this.selectedSymbols.includes(this.listOfSymbols[j])) {
        j = Math.floor(Math.random() * (this.listOfSymbols.length - 1))
      } else {
        this.selectedSymbols[i] = this.listOfSymbols[j];
        i++
      }
    }
    for (let k = 0; k < this.selectedSymbols.length; k++) {
      this.getStockService.getStockPrices(this.selectedSymbols[k]).subscribe((response) => {
        this.lastRefreshed = response["Meta Data"]["3. Last Refreshed"]

        this.stockPrices = response["Time Series (5min)"][this.lastRefreshed]
        this.stockPrices["6. refresh"]=this.lastRefreshed

        this.stockPrices["0. symbol"] = response["Meta Data"]["2. Symbol"]
        this.threeStocks.push(this.stockPrices)
      })
    }
    setInterval(() => {
      this.threeStocks = [];
      this.selectedSymbols=[];
      let i = 0;
      let j = Math.floor(Math.random() * (this.listOfSymbols.length - 1))

      while (this.selectedSymbols.length < 2) {
        if (this.selectedSymbols.includes(this.listOfSymbols[j])) {
          j = Math.floor(Math.random() * (this.listOfSymbols.length - 1))
        } else {
          this.selectedSymbols[i] = this.listOfSymbols[j];
          i++
        }
      }
      for (let k = 0; k < this.selectedSymbols.length; k++) {
        this.getStockService.getStockPrices(this.selectedSymbols[k]).subscribe((response) => {
          this.lastRefreshed = response["Meta Data"]["3. Last Refreshed"]
          this.stockPrices = response["Time Series (5min)"][this.lastRefreshed]
          this.stockPrices["6. refresh"]=this.lastRefreshed
          this.stockPrices["0. symbol"] = response["Meta Data"]["2. Symbol"]
          this.threeStocks.push(this.stockPrices)
        })
      }
    }, 1000 * 60 * 1)}


    searchBuffer:string="";
  itemFound:SearchingList={"1. symbol": "",
                            "2. name": "",
                            "3. type":"",
                            "4. region": "",
                            "5. marketOpen": "",
                            "6. marketClose": "",
                            "7. timezone": "",
                            "8. currency": "",
                            "9. matchScore": ""
                          }
listOfFounds:SearchingList[]=[];
addStock(){

    this.getStockService.getStockPrices(this.searchBuffer).subscribe((response) => {
      this.lastRefreshed = response["Meta Data"]["3. Last Refreshed"]
      this.stockPrices = response["Time Series (5min)"][this.lastRefreshed]
      this.stockPrices["6. refresh"]=this.lastRefreshed
      this.stockPrices["0. symbol"] = response["Meta Data"]["2. Symbol"]
      this.threeStocks.push(this.stockPrices)
      this.searchBuffer="";



  })
}

}
