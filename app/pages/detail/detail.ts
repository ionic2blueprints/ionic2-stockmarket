import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {StockInfo} from '../../providers/stock-info';
import {StockChart} from '../../component/stock-chart/stock-chart';
import {StockCmp} from '../../component/stock/stock';
import {StockDetailCmp} from '../../component/stock-detail/stock-detail';
import {StorageProvider} from '../../providers/storage';

@Component({
    templateUrl: 'build/pages/detail/detail.html',
    directives:[StockChart, StockCmp, StockDetailCmp]
})
export class Detail {
    notes = [];
    month:number = 1;
    details:{};
    quote:any;
    data:any;
    constructor(params: NavParams, public stockinfo:StockInfo, public storageProvider: StorageProvider) {
        this.quote = params.get('quote');        
        this.getChartData();
        this.getNotes();
    }
    
    addNote(noteElm) {
        if(noteElm.value) {
            this.storageProvider.setNotes(this.quote.symbol, noteElm.value)
            .then( (data)=> {
                this.notes.push({rowid: data.res.insertId, value:noteElm.value, symbol:this.quote.symbol});
                noteElm.value = "";
            })
        }
    }
    
    deleteNote(rowid,i) {
        this.storageProvider.removeNote(rowid);
        this.notes.splice(i,1);
    }
    
    getChartData() {
            this.stockinfo.getChart(this.quote.symbol, this.month)
            .subscribe(data=> {
            let newData:any = {};
            newData.series = [];
            newData.series.push({meta: 'Low', name: 'Low', data:[]});
            newData.series.push({meta: 'Close',name: 'Close', data:[]});
            data.forEach(day=> {
                newData.series[0].data.unshift(Number.parseFloat(day.Low));
                newData.series[1].data.unshift(Number.parseFloat(day.Close));
            });
                this.data = newData;          
            });        
    }
    
    getNotes() {
         this.storageProvider.getAllNotes(this.quote.symbol)
        .then(data => {
           let set = data.res.rows;
           this.notes = Array.from(set);
        });
    }
}