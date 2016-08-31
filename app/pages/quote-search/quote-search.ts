import {Component} from '@angular/core';
import {Control} from '@angular/common';
import {Page, ViewController, Events} from 'ionic-angular';
import {StockInfo} from '../../providers/stock-info';
import {StorageProvider} from '../../providers/storage';

@Component({
    templateUrl: 'build/pages/quote-search/quote-search.html'
})
export class QuoteSearch {
    searchbar = new Control();
    quoteList:Array<any>;
    constructor(public stockInfo: StockInfo, public vc:ViewController, public storage: StorageProvider, public events:Events) {
        this.searchbar.valueChanges
        .filter(value => value.trim().length > 2)
        .distinctUntilChanged()
        .debounceTime(2000)
        .subscribe(value => {
            this.search(value);
        });
    }
    
    search(value) {
        this.stockInfo.getQuotes(value)
        .subscribe(list => {
            this.quoteList = list;
        });
    }
    
    watch(quote) {
        this.events.publish("stock:watch", quote);
        this.storage.setQuote(quote.symbol, quote);
    }
    
    close() {
        this.vc.dismiss();
    }
}