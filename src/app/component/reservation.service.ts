import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Reservation } from '../domain/models/reservation';
import { Berber } from '../domain/models/berber';
import { ReservationStorage } from '../storage/reservation-data';
import { ReservationViewModel } from '../domain/models/Dtos/reservationDtos';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  berbers: Berber[] = [];

  private reservationsUrl = 'api/reservations';
  private berbersUrl = 'api/berbers';
  private localStorageKey = 'reservations';

  constructor(private http: HttpClient, private reservationStorage: ReservationStorage) { }

  getReservationsApi(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.reservationsUrl);
  }

  getBerbersApi(): Observable<Berber[]> {
    return this.http.get<Berber[]>(this.berbersUrl);
  }

  getBerberByIdApi(id: number): Observable<Berber> {
    return this.http.get<Berber>(`${this.berbersUrl}/${id}`);
  }


  submitReservationApi(reservation: Reservation): Observable<Reservation> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Reservation>(this.reservationsUrl, reservation, { headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data)))
      );
  }

  getReservationById(id: number): Observable<Reservation> {
    const url = `${this.reservationsUrl}/${id}`;
    return this.http.get<Reservation>(url);
  }

  addBerber(berber: Berber): Observable<Berber> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Berber>(this.berbersUrl, berber, { headers })
      .pipe(
        tap(data => console.log('addBerber response: ', data))
      );
  }

  deleteBerber(berberId: number): Observable<any> {
    debugger;
    this.getReservationsApi().subscribe({
      next: (r: Reservation[]) => {
        var res = r.filter(reservation => reservation.berberId == berberId);
        res.forEach(reservation => {
          this.deleteReservation(reservation.id!);
        });
      },
      error: (error: any) => {
        console.error('Error fetching reservations:', error);
      }
    });

    const url = `${this.berbersUrl}/${berberId}`;
    return this.http.delete(url)
      .pipe(
        tap(_ => console.log(`deleted berber with id=${berberId}`))
      );
  }

  deleteReservation(reservationId: number): void {
    debugger;
    const url = `${this.reservationsUrl}/${reservationId}`;
    this.http.delete(url).subscribe({
      next: (response) => {
        console.log('Reservation deleted successfully', response);
        //this.fetchReservations();
      },
      error: (error) => {
        console.error('Error deleting reservation: ', error);
      }
    });
  }

}


