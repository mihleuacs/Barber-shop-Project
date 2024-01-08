import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { Reservation } from 'src/app/domain/models/reservation';
import { ReservationViewModel } from 'src/app/domain/models/Dtos/reservationDtos';
import { Berber } from 'src/app/domain/models/berber';
import { forkJoin, map, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  reservationsWithDetails: ReservationViewModel[] = [];
  filteredReservations: ReservationViewModel[] = [];
  searchTerm = '';
  berberId: number | undefined;
  isLoading = false;

  constructor(private reservationService: ReservationService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.berberId = params['berberId'];
    });
  }

  ngOnInit(): void {
    this.fetchReservationsWithDetails();
  }


  fetchReservationsWithDetails(): void {
    this.isLoading = true;
    this.reservationService.getReservationsApi().pipe(
      switchMap((reservations) => {
        debugger;
        const berberObservables = reservations.map(reservation =>
          this.reservationService.getBerberByIdApi(reservation.berberId)
        );
        return forkJoin(berberObservables).pipe(
          map(berbers => {
            return reservations.map((reservation, index) => {
              return {
                ...reservation,
                berber: berbers[index] || null 
              };
            });
          })
        );
      })
    ).subscribe({
      next: (reservations) => {
        
        this.reservationsWithDetails = reservations;
        if (this.berberId != undefined) {
          this.reservationsWithDetails = this.reservationsWithDetails.filter(reservation => reservation.berber.id == this.berberId);
        }
        this.filteredReservations = this.reservationsWithDetails;

      },
      error: (error: any) => {
        console.error('Error fetching reservations with details:', error);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  applyFilter(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredReservations = [...this.reservationsWithDetails];
      return;
    }

    const searchTerm = this.searchTerm.toLowerCase().trim();
    this.filteredReservations = this.reservationsWithDetails.filter(reservation => {
      return (
        reservation.clientName.toLowerCase().includes(searchTerm) ||
        reservation.berber.name.toLowerCase().includes(searchTerm)
      );
    });
  }

  filterReservations(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredReservations = this.reservationsWithDetails.slice();
      return;
    }

    searchTerm = searchTerm.toLowerCase();
    this.filteredReservations = this.reservationsWithDetails.filter((reservation) =>
      reservation.clientName.toLowerCase().includes(searchTerm) ||
      reservation.clientSurname.toLowerCase().includes(searchTerm) ||
      reservation.berber.name.toLowerCase().includes(searchTerm)
    );
  }

  calculateTimeZoneOffset(date: Date): string {
    var d = new Date(date);
    var timeZoneDifference = (d.getTimezoneOffset() / 60) * -1;
    d.setTime(d.getTime() + (timeZoneDifference * 60) * 60 * 1000);
    return d.toISOString()
  }
  
  goBack(): void {
    this.router.navigate(['/admin']);
  }
}