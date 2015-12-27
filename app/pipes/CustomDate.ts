import {Pipe} from 'angular2/core';

@Pipe({
  name: 'customdate'
})
export class CustomDate {
  transform(unixTimeStamp: number, args: string[]): any {
    var date = new Date(unixTimeStamp*1000);
    return date;
  }
}
