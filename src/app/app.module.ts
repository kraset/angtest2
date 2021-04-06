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
import { Child1Component } from './components/subject/child1/child1.component';
import { EditPersonComponent } from './components/subject/edit-person/edit-person.component';
import { API_BASE_URL } from './data/services/petstore-api.service';
import { PetStoreComponent } from './components/pet-store/pet-store.component';
import { HttpClientModule } from '@angular/common/http';
import { SubjectComponent } from './components/subject/subject.component';

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
    SubjectComponent,
    Child1Component,
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
