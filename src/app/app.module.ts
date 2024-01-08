import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { MenuComponent } from './layout/menu/menu.component';
import { ReservationService } from './component/reservation.service';
import { HttpClientModule } from '@angular/common/http';
import { ReservationStorage } from './storage/reservation-data';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from './component/reservation/reservation.component';
import { ReservationAddComponent } from './component/reservation-add/reservation-add.component';
import { ReservationAdminComponent } from './component/reservation-admin/reservation-admin.component';
import { ReservationDetailsComponent } from './component/reservation-details/reservation-details.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    ReservationComponent,
    ReservationAddComponent,
    ReservationAdminComponent,
    ReservationDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    InMemoryWebApiModule.forRoot(ReservationStorage),
    AppRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [ReservationStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class ReservationAddModule { }