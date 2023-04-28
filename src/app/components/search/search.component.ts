import { Component } from '@angular/core';
import { SearchingList } from 'src/app/models/searching-list';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {



constructor(private searchSymbol:SearchService){}



}
