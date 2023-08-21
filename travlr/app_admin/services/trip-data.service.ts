import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpClient and HttpHeader

import { User } from 'src/app/user';
import { AuthResponse } from 'src/app/authresponse';
import { BROWSER_STORAGE } from 'src/app/storage';

import { Trip } from '../models/trip';

@Injectable()
export class TripDataService {

  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage) { }

  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;

  public getTrip(tripCode: string): Promise<Trip> {
    console.log('Inside TripDataService#getTrip(tripCode)');
    return this.http
      .get(this.tripUrl + tripCode)
      .toPromise()
      .then(response => response as Trip)
      .catch(this.handleError);
   }

  public getTrips(): Promise<Trip[]> {
    console.log('Inside TripDataService#getTrips');
    return this.http
      .get(`${this.apiBaseUrl}trips`)
      .toPromise()
      .then(response => response as Trip[])
      .catch(this.handleError);
  }

  public addTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#addTrip');

    // Get the JWT token from storage
    const token = this.storage.getItem('travlr-token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .post(`${this.apiBaseUrl}trips`, formData, { headers: headers })
      .toPromise()
      .then(response => response as Trip[])
      .catch(this.handleError);
  }

  public updateTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#UpdateTrip');
    console.log(formData);

    // Get the JWT token from storage
    const token = this.storage.getItem('travlr-token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .put(this.tripUrl + formData.code, formData, { headers: headers })
      .toPromise()
      .then(response => response as Trip[])
      .catch(this.handleError);
  }

  public deleteTrip(tripCode: string): Promise<Trip> {
    console.log('Inside TripDataService#DeleteTrip');
    console.log(tripCode);

    // Get the JWT token from storage
    const token = this.storage.getItem('travlr-token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .delete(this.tripUrl + tripCode, { headers: headers })
      .toPromise()
      .then(response => response as Trip[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post(url, user)
      .toPromise()
      .then(response => response as AuthResponse)
      .catch(this.handleError)
  }
  
}