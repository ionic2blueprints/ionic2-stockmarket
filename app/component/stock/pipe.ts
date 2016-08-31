import {Pipe} from '@angular/core';
@Pipe({
    name: 'numberString'
})
export class NumberStringPipe {
    transform(val, args) {
        return Number.parseFloat(val).toFixed(3);
    }
}