import { Component, OnInit } from '@angular/core';
import { Berber } from 'src/app/domain/models/berber';
import { ReservationService } from '../reservation.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/layout/helpers/toast-service';
@Component({
  selector: 'app-reservation-admin',
  templateUrl: './reservation-admin.component.html',
  styleUrls: ['./reservation-admin.component.css']
})
export class ReservationAdminComponent implements OnInit{
  newBerber = {
    name: '',
    surname: '',
  };
  berbers: Berber[] = [];
  reservation: any;


  constructor(private reservationService: ReservationService,private router: Router, private toastService: ToastService) { }
     
  
  
  ngOnInit(): void {
    this.fetchBerbers();
  }

  
  addNewBerber(): void {
    this.reservationService.addBerber(this.newBerber).subscribe({
      next: (response) => {
        console.log('Berber added successfully', response);
        this.fetchBerbers();
        this.newBerber = { name: '', surname: '' };
        this.toastService.showSuccess('Added berber successfuly!');
      },
      error: (error) => {
        console.error('Error adding berber: ', error);
        this.toastService.showSuccess('There has been an error!');
      }
    }); 
  }

  deleteBerber(berberId: number): void {
    this.reservationService.deleteBerber(berberId).subscribe({
      next: (response) => {
        console.log('Berber deleted successfully', response);
        this.fetchBerbers();
        this.newBerber = {  name: '', surname: '' };
        this.toastService.showSuccess('Berber deleted successfuly!');
      },
      error: (error) => {
        console.error('Error adding berber: ', error);
        this.toastService.showSuccess('There has been an error!');
      }
    }
    );
  }

  fetchBerbers() {
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


  redirectToReservations(): void {
    this.router.navigate(['/reservations']);
  }

  onBerberClick(berberId: number) {
    this.router.navigate(['/reservations'], { queryParams: { berberId: berberId.toString() } });
  }
}

