import {Component, Input, Output, ViewChild, ElementRef, OnChanges} from '@angular/core';
declare var Chartist;
@Component({
    selector: 'stock-chart',
    template: ``        
})
export class StockChart {
    @Input() data:{};
    constructor(public elm: ElementRef) {}
     
    ngOnChanges() {
        if(this.data) {
            let options = {
                showPoint: false,
                axisX: {
                    showGrid: true,
                    showLabel:true
                },
                showArea:true,
                chartPadding: {
                    top: 15,
                    bottom: 5,
                    left: 10
                }
            };
            let chart = new Chartist.Line(this.elm.nativeElement,this.data, options);
        }
    }
}