import { Component, OnInit } from '@angular/core';
import { DeviceService } from './device-service.service';
import moment from 'moment'
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SmartHomeApp';
  currentDate = new Date();
  acs: Array<any> | undefined;
  lights: Array<any> | undefined;
  alarms: Array<any> | undefined;
  cameras: Array<any> | undefined;
  deviceHistories: Array<any> | undefined;

  minFromDate: Date| undefined;
  maxFromDate: Date | undefined | null;
  minToDate: Date | undefined| null;
  maxToDate: Date| undefined;
  /**
   *
   */
  constructor(public deviceService: DeviceService) {

  }
  ngOnInit(): void {
    this.deviceService.getAC().subscribe(acs => this.acs = acs);
    this.deviceService.getLight().subscribe(lights => this.lights = lights);
    this.deviceService.getAlarm().subscribe(alarms => this.alarms = alarms);
    this.deviceService.getCamera().subscribe(cameras => this.cameras = cameras);
    this.minToDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    this.maxFromDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    this.filterDate();
  }

  refreshData() {

    this.deviceService.getAC().subscribe(acs => this.acs = acs);
    this.deviceService.getLight().subscribe(lights => this.lights = lights);
    this.deviceService.getAlarm().subscribe(alarms => this.alarms = alarms);
    this.deviceService.getCamera().subscribe(cameras => this.cameras = cameras);
    this.filterDate();
  }

  // filterDate(){
  //   let fromdate=moment(this.myDateValue).format('DD-MM-YYYY');
  //   console.log(fromdate)
  //   let todate=moment(this.toDate).format('DD-MM-YYYY');
  //   this.array.filter(
  //   m => new Date(m.fromDate) >= new Date(fromdate) && new Date(m.fromDate) <= new Date(todate));
  //   console.log(this.array)
  // }
  onDateChange(newDate: Date) {
    console.log(newDate);
  }
  fromDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
    this.minToDate = event.value;

    if (event.value !== null) {
      this.maxToDate = new Date(
        event!.value.getFullYear(),
        event!.value.getMonth(),
        event!.value.getDate() + 30
      );
    }
  }

  toDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    this.maxFromDate = event.value;

    if (event.value !== null) {
      this.minFromDate = new Date(
        event!.value.getFullYear(),
        event!.value.getMonth(),
        event!.value.getDate() - 30
      );
    }
  }
  reverseAndTimeStamp(dateString : any) {
    const reverse = new Date(dateString.split("-").reverse().join("-"));
    return reverse.getTime();
  }
  filterDate() {
    this.deviceHistories = [];
    if (this.maxFromDate && this.minToDate) {
      this.deviceService.getHistory(this.minToDate, this.maxFromDate).subscribe(deviceHistories => this.deviceHistories = deviceHistories);
    }

  }

}
