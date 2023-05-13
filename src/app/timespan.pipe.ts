import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timespan'
})
export class TimespanPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (!value) {
      return '';
    }
    const timeSpan = value.split(':').map((x: string) => parseFloat(x));
    const timeString = timeSpan[0] + "h " + timeSpan[1] + "m " + Math.floor(timeSpan[2]) + "s";

    const formattedTimeSpan = timeString ;

    return formattedTimeSpan.trim();
  }

}

