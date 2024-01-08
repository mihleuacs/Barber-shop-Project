import { Injectable } from "@angular/core";
import { Reservation } from "../domain/models/reservation";
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Berber } from "../domain/models/berber";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ReservationStorage implements InMemoryDbService {
  reservations: Reservation[] = [];

  constructor() {
    this.reservations = [
    ];
  }

  createDb(): { reservations: Reservation[], berbers: Berber[] } {
    const reservations: Reservation[] = [
      {
        id: 1,
        date: new Date('2023-01-15'),
        clientName: 'Ivica',
        clientSurname: 'Ivanovski',
        berberId: 1
      },
      {
        id: 2,
        date: new Date('2023-02-20'),
        clientName: 'Marija',
        clientSurname: 'Trenkovska',
        berberId: 2
      },
      {
        id: 3,
        date: new Date('2023-03-10'),
        clientName: 'Svetlana',
        clientSurname: 'Svetlevska',
        berberId: 3
      },
      {
        id: 4,
        date: new Date('2023-04-05'),
        clientName: 'Momir',
        clientSurname: 'Momirovski',
        berberId: 1
      },
      {
        id: 5,
        date: new Date('2023-05-12'),
        clientName: 'Dejan',
        clientSurname: 'Trajkovski',
        berberId: 2
      },
    ];

    const berbers: Berber[] = [
      {
        id: 1,
        name: 'Ognen',
        surname: 'Bozhinov',
      },
      {
        id: 2,
        name: 'Antonio',
        surname: 'Gilev',
      },
      {
        id: 3,
        name: 'Stefce',
        surname: 'Trajkovski',
      },
      {
        id: 4,
        name: 'Mihail',
        surname: 'Shapkarov',
      },
      {
        id: 5,
        name: 'Oliver',
        surname: 'Dragoevski',
      },
    ];

    return { reservations, berbers };

  }
}
