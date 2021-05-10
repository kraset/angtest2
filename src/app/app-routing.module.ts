import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsyncStuffComponent } from './components/async-stuff/async-stuff.component';
import { BasicExamplesComponent } from './components/basic-examples/basic-examples.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DragStuffComponent } from './components/drag-stuff/drag-stuff.component';
import { FlexComponent } from './components/flex/flex.component';
import { GameClientComponent } from './components/more-rxjs/game-client.component';
import { PetStoreComponent } from './components/pet-store/pet-store.component';
import { ResponsiveComponent } from './components/responsive/responsive.component';
import { GrandParentComponent } from './components/subject/grand-parent.component';
import { VerifyInputComponent } from './components/verify-input/verify-input.component';

const routes: Routes = [
  { path: '', component: BasicExamplesComponent },
  { path: 'basic-examples', component: BasicExamplesComponent },
  { path: 'pet-store', component: PetStoreComponent },
  { path: 'async', component: AsyncStuffComponent },
  { path: 'more-rxjs', component: GameClientComponent },
  { path: 'subject', component: GrandParentComponent },
  { path: 'flex', component: FlexComponent },
  { path: 'responsive', component: ResponsiveComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'dragdrop', component: DragStuffComponent },
  { path: 'verify-input', component: VerifyInputComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
