import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { CalendarComponent } from './calendar/calendar.component';
import { FormsModule } from '@angular/forms';
import { Test1Component } from './test1/test1.component';
import { ResponsiveComponent } from './responsive/responsive.component';
import { CommonModule } from '@angular/common';
import { DragStuffComponent } from './drag-stuff/drag-stuff.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlexComponent } from './flex/flex.component';
import { AsyncStuffComponent } from './async-stuff/async-stuff.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    Test1Component,
    ResponsiveComponent,
    DragStuffComponent,
    FlexComponent,
    AsyncStuffComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,         // for ngModel
    MatSliderModule,
    MatDatepickerModule, // for Calendar and datepicker
    MatNativeDateModule, // for Calendar and datepicker
    BrowserAnimationsModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
