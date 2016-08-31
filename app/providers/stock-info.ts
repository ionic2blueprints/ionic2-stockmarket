import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/operator/map';

@Injectable()
export class StockInfo {
    constructor(public http:Http) {}
    
    encodeURI(string) {
        return encodeURIComponent(string).replace(/\"/g, "%22").replace(/\ /g, "%20").replace(/[!'()]/g, encodeURI);
    }

    getPriceInfo(symbol) {
        let query = `select * from yahoo.finance.quote where symbol IN('${symbol}')`;
        let url = 'http://query.yahooapis.com/v1/public/yql?q=' + this.encodeURI(query) + '&format=json&env=http://datatables.org/alltables.env';
        // let url = `https://finance.yahoo.com/webservice/v1/symbols/${symbol}/quote?format=json&view=detail`;
        let stocks = Observable.interval(5 * 1000)
        .flatMap(()=> {
            return this.http.get(url).retry(5);
        })
        .map(data => {
           let jsonData = data.json();
           return jsonData.query.results.quote; 
        });
        return stocks;
    }

    getDetail(symbol) {
        let query = `select * from yahoo.finance.quotes where symbol IN ("' ${symbol} '")`;
        let url = 'http://query.yahooapis.com/v1/public/yql?q=' + this.encodeURI(query) + '&format=json&env=http://datatables.org/alltables.env';
        return this.http.get(url).map(data => data.json().query.results.quote);
    }

    getdate(m) {
        let d = new Date();
        d.setMonth(d.getMonth()-m);
        let year = d.getFullYear().toString();
        let month = (d.getMonth()+ 1).toString();
        let day = d.getDate().toString();
        
        if(month.length === 1) {
            month = "0" + month;
        }
        
        if(day.length === 1) {
            day = "0" + day;
        }
        
        let formatted = `${year}-${month}-${day}`;
        return formatted;
        
    }
    
    getQuotes(name) {
        let url = `https://s.yimg.com/aq/autoc?query=${name}&region=CA&lang=en-CA`;
        return this.http.get(url)
        .map(data => {
            let result = data.json();
            return result.ResultSet.Result;
        });
    }
    
    getChart(symbol,from=1) {
        let todayDate = this.getdate(0);
        let fromDate = this.getdate(from);
        let query = 'select * from yahoo.finance.historicaldata where symbol = "' + symbol + '" and startDate = "' + fromDate + '" and endDate = "' + todayDate + '"';
        let url = 'http://query.yahooapis.com/v1/public/yql?q=' + this.encodeURI(query) + '&format=json&env=http://datatables.org/alltables.env';
        return this.http.get(url).map((data) => {
            console.log(url);
            let result = data.json().query.results;
            if(result) {
                return result.quote
            } else {
                return [];
            }
        });
    }

}