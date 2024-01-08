import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router) { }

  navigateToReservations() {
    this.router.navigate(['/reservations/add']);
  }
  navigateToAdmin()
  {
    this.router.navigate(['/admin']);
  }
}
