import {Component, Input, OnInit} from '@angular/core';
import {StockInfo} from '../../providers/stock-info'; 

@Component({
    selector: 'stock-detail',
    templateUrl: 'build/component/stock-detail/stock-detail.html',
})

export class StockDetailCmp {
    @Input() symbol;
    detail = {};
    constructor(public stockInfo: StockInfo) {
    }
    
    ngOnInit() {
        this.stockInfo.getDetail(this.symbol)
        .subscribe(data => {
            this.detail = data;
        });
    }
    
}