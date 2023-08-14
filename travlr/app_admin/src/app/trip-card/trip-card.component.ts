import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from 'models/trip';
import { TripDataService } from 'services/trip-data.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {

  @Input('trip') trip: Trip;

  constructor(
    private router: Router,
    private tripService: TripDataService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  private editTrip(trip: Trip): void {
    localStorage.removeItem("tripCode");
    localStorage.setItem("tripCode", trip.code);
    this.router.navigate(['edit-trip']);
  }

  private deleteTrip(trip: Trip): void {
    this.tripService.deleteTrip(trip.code)
      .then(data => {
        console.log(data);
        this.router.navigate([this.router.url]);
      });
  }

}
