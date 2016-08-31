import {Component} from '@angular/core';
import {NavController, Modal, Events} from 'ionic-angular';
import {StockCmp} from '../../component/stock/stock';
import {StockChart} from '../../component/stock-chart/stock-chart';
import {QuoteSearch} from '../quote-search/quote-search';
import {Detail} from '../detail/detail';
import {StorageProvider} from '../../providers/storage';

@Component({
  templateUrl: 'build/pages/stock-list/stock-list.html',
  directives: [StockCmp, StockChart]
})
export class StockList {
  quoteList = [];
  run:Boolean;
  constructor(public nav:NavController, public storageProvider: StorageProvider, public events: Events) {    
    this.storageProvider.getAllQuotes()
    .then(data => {
      let result = data.res.rows;
      for(let i=0; i < result.length; i++) {
       this.quoteList.push(JSON.parse(result[i].value));
      }
    });
    
    this.events.subscribe("stock:watch", (stock) => {
      this.quoteList.push(stock[0]);
    });
    
   }
  
  searchQuote() {
    let modal = Modal.create(QuoteSearch);
    this.nav.present(modal);
  }
  
  deleteItem(index, symbol) {
    this.storageProvider.removeQuote(symbol)
    .then(()=>{
      this.quoteList.splice(index, 1);
    });
  }
  
  ionViewWillEnter() {
   this.run = true;
  }
  
  ionViewWillLeave() {
    this.run = false;
  }
  
  openDetail(quote) {
    this.nav.push(Detail, {quote:quote});
  }
 
}
