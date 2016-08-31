import {Injectable} from '@angular/core';
import {Storage, SqlStorage} from 'ionic-angular';

@Injectable()
export class StorageProvider {
    storage = new Storage(SqlStorage);
    constructor() {
        this.storage.query("create table IF NOT EXISTS quotes(stock unique, value)");
        this.storage.query("create table IF NOT EXISTS notes(symbol, value)");
    }
        
    setQuote(key, value) {
        value = JSON.stringify(value);
        let query = `insert into quotes values('${key}', '${value}');`;
        return this.storage.query(query);
    }
    
    getAllQuotes() {
        return this.storage.query("select * from quotes");
    }
    
    removeQuote(key) {
        let query = `delete from quotes where stock='${key}'`;
        return this.storage.query(query);
    }
    
    setNotes(symbol, value) {
        let query = `insert into notes(symbol, value) values('${symbol}', '${value}')`;
        return this.storage.query(query);
    }
    
    getAllNotes(symbol) {
        let query = `select rowid, * from notes where symbol='${symbol}';`;
        return this.storage.query(query);
    }
    
    removeNote(rowid) {
        let query = `delete from notes where rowid = ${rowid}`;
        return this.storage.query(query);
    }
}