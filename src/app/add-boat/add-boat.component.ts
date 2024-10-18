import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Boat } from '../models/boat';

@Component({
  selector: 'app-add-boat',
  templateUrl: './add-boat.component.html',
  styleUrls: ['./add-boat.component.css']
})
export class AddBoatComponent {
  boat: Boat = {
    id: 0,
    name: '',
    description: '',
    type: '',
    length: 0,
    width: 0,
    capacity: 0,
    yearBuilt: 0,
    price: 0,
    imageUrl: '',
    status: ''
  };

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  addBoat(): void {
    const token = localStorage.getItem('jwtToken');
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();

    this.http.post<Boat>(`${this.apiUrl}/boats`, this.boat, { headers })
      .subscribe({
        next: () => {
          console.log('Boat added successfully!');
          this.router.navigate(['/boats']);
        },
        error: (err) => {
          console.error('Error adding boat', err);
        }
      });
  }

  navigateToBoatList(): void {
    this.router.navigate(['/boats']);
  }
}
