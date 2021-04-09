import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FormsModule } from '@angular/forms';
import { Test1Component } from './components/test1/test1.component';
import { ResponsiveComponent } from './components/responsive/responsive.component';
import { CommonModule } from '@angular/common';
import { DragStuffComponent } from './components/drag-stuff/drag-stuff.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlexComponent } from './components/flex/flex.component';
import { AsyncStuffComponent } from './components/async-stuff/async-stuff.component';
import { MiddleChildComponent } from './components/subject/middle-child/middle-child.component';
import { EditPersonComponent } from './components/subject/middle-child/edit-person/edit-person.component';
import { API_BASE_URL } from './data/services/petstore-api.service';
import { PetStoreComponent } from './components/pet-store/pet-store.component';
import { HttpClientModule } from '@angular/common/http';
import { GrandParentComponent } from './components/subject/grand-parent.component';

export function getBaseUrl(): string {
  return 'https://petstore.swagger.io/v2';
}

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    Test1Component,
    ResponsiveComponent,
    DragStuffComponent,
    FlexComponent,
    AsyncStuffComponent,
    GrandParentComponent,
    MiddleChildComponent,
    EditPersonComponent,
    PetStoreComponent,
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
    HttpClientModule,
  ],
  providers: [
    {
      provide: API_BASE_URL,
      useFactory: getBaseUrl
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
