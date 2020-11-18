import { Component, OnInit } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  today = new Date();
  selectedDate: Date | null = new Date();
  minDate = new Date();
  bookedDateStart = new Date(new Date().setDate(24));
  bookedDateEnd = new Date(new Date().setDate(27));

  constructor() {}

  ngOnInit(): void {
    this.minDate.setDate(this.today.getDate() - 1);
  }

  onSelect(date: Date | null): void {
    if (date) {
      console.log(date);
      if (!this.isBooked(date)) {
        this.selectedDate = date;
      }
    }
  }

  isBooked(d: Date): boolean {
    return d >= this.bookedDateStart && d <= this.bookedDateEnd;
  }

  // Filter out all Sundays
  myFilter(date: Date): boolean {
    return date.getDay() !== 0;
  }

  // Filter out all Booked-dates
  // tslint:disable-next-line: typedef
  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      return this.isBooked(date) ? 'special-date' : ''; // defined in .scss file...
    };
  }
}
