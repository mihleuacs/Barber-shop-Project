import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationViewModel } from 'src/app/domain/models/Dtos/reservationDtos';
import { ReservationService } from '../reservation.service';
import { forkJoin, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css']
})
export class ReservationDetailsComponent implements OnInit {
  selectedReservation: ReservationViewModel | null = null;
  reservation: ReservationViewModel | undefined;


  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.getReservationDetails();
  }

  getReservationDetails(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.reservationService.getReservationById(id).pipe(
      switchMap((reservation) => {
        const reservationWithDetails =
          this.reservationService.getBerberByIdApi(reservation.berberId).pipe(
            map(berber => {
              return {
                ...reservation,
                berber: berber || null 
              };
            })
          );
          return reservationWithDetails;
      })
    ).subscribe({
      next: (reservationWithDetails) => {
        this.reservation = reservationWithDetails;
      },
      error: (error: any) => {
        console.error('Error fetching reservations with details:', error);
      }
    });
  }
}
