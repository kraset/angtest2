import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  today = new Date();
  selectedDate: Date = new Date();
  minDate = new Date();
  bookedDateStart = new Date(new Date().setDate(24));
  bookedDateEnd = new Date(new Date().setDate(27));

  ngOnInit(): void {
    this.minDate.setDate(this.today.getDate() - 1);
  }

  onSelect(event: any): void {
    // console.log(event);
    // this.selectedDate = event;
  }

  myDateFilter(d: Date): boolean {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && !this.isBooked(d);
  }

  isBooked(d: Date): boolean {
    return d >= this.bookedDateStart && d <= this.bookedDateEnd;
  }

}
