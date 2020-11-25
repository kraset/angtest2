import { AfterViewChecked, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';

const bookedDates: Date[] = [
  new Date('2020-12-02'),
  new Date('2020-12-03'),
  new Date('2020-12-04'),
  new Date('2020-12-08'),
  new Date('2020-12-11'),
  new Date('2020-12-12'),
  new Date('2020-11-22'),
  new Date('2020-11-23'),
  new Date('2020-11-26'),
  new Date('2020-11-28'),
  new Date('2020-11-29'),
  new Date('2020-11-30'),
];

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnChanges, AfterViewChecked {
  today = new Date();
  selectedDate: Date | null = new Date();
  minDate = new Date();
  bookedDateStart = new Date(new Date().setDate(24));
  bookedDateEnd = new Date(new Date().setDate(27));
  bookedDaysThisMonth: number[] | undefined = undefined;

  constructor() {}

  ngAfterViewChecked(): void {
    this.bookedDaysThisMonth = undefined;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('onchanges');
  }

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

  setBookedDaysThisMonth(year: number, month: number): void {
    this.bookedDaysThisMonth = bookedDates.filter( date =>
      date.getFullYear() === year && date.getMonth() === month
    ).map( date => date.getTime()).sort( (date1, date2) => date1 - date2);
    console.log(this.bookedDaysThisMonth);
  }


  // Filter out all Booked-dates
  // tslint:disable-next-line: typedef
  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      if (!this.bookedDaysThisMonth){
        this.setBookedDaysThisMonth(date.getFullYear(), date.getMonth());
      }
      return this.isBooked(date) ? 'special-date' : ''; // defined in .scss file...
    };
  }
}
