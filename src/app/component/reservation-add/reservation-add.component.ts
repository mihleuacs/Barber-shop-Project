import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from '../reservation.service';
import { Berber } from 'src/app/domain/models/berber';
import { Reservation } from 'src/app/domain/models/reservation';
import { NgForm } from '@angular/forms';
import { ToastService } from 'src/app/layout/helpers/toast-service';

@Component({
  selector: 'app-reservation-add',
  templateUrl: './reservation-add.component.html',
  styleUrls: ['./reservation-add.component.css']
})
export class ReservationAddComponent implements OnInit {
  berbers: Berber[] = [];
  reservation: Reservation = {
    date: new Date(),
    clientName: '',
    clientSurname: '',
    berberId: 0
  };

  selectedDate: Date = new Date();
  selectedTime: string = '';

  constructor(private router: Router, private reservationService: ReservationService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.reservationService.getBerbersApi().subscribe({
      next: (berbers) => {
        this.berbers = berbers;
        console.log(this.berbers);
      },
      error: (error: any) => {
        console.error('Error fetching reservations:', error);
      }
    });
  }

  submitReservation(form: NgForm): void {
    if (this.reservation.clientName != '' && this.reservation.clientSurname != '') {
      const selectedDate: Date = form.value.selectedDate;
      const selectedTime: string = form.value.selectedTime;

      this.reservation.date = new Date(selectedDate + 'T' + selectedTime);
      this.reservationService.submitReservationApi(this.reservation!).subscribe({
        next: (response) => {
          console.log('Submission Response:', response);
          this.router.navigate(['/reservations', response.id]);
          this.toastService.showSuccess('Reservation successful!');
        },
        error: (error) => {
          console.error('Error submitting reservation:', error);
        }
      });

    }

  }

  fetchReservations() {
    this.reservationService.getReservationsApi().subscribe({
      next: (reservations) => {
        console.log('Fetched Reservations:', reservations);
      },
      error: (error) => {
        console.error('Error fetching reservations:', error);
      }
    });
  }
}