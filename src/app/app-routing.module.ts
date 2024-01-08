import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationComponent } from './component/reservation/reservation.component';
import { MenuComponent } from './layout/menu/menu.component';
import { ReservationAddComponent } from './component/reservation-add/reservation-add.component';
import { ReservationAdminComponent } from './component/reservation-admin/reservation-admin.component';
import { ReservationDetailsComponent } from './component/reservation-details/reservation-details.component';

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'reservations', component: ReservationComponent },
  { path: 'reservations/add', component: ReservationAddComponent },
  { path: 'reservations/:id', component: ReservationDetailsComponent },
  { path: 'admin', component: ReservationAdminComponent },

  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
