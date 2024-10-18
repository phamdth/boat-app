import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Boat } from '../models/boat';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-edit-boat',
  templateUrl: './edit-boat.component.html',
  styleUrls: ['./edit-boat.component.css']
})
export class EditBoatComponent implements OnInit {
  boat: Boat = {
    id: 0, name: '', description: '',
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

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBoat();
  }

  loadBoat(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Boat ID from route:', id);
    if (id) {
      const token = localStorage.getItem('jwtToken');
      const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();

      this.http.get<Boat>(`${this.apiUrl}/boats/${id}`, { headers }).subscribe({
        next: (data: Boat) => {
          console.log('Boat data fetched:', data);
          this.boat = data;
        },
        error: (err) => {
          console.error('Error fetching boat details', err);
        }
      });
    }
  }

  updateBoat(): void {
    const token = localStorage.getItem('jwtToken');
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();

    this.http.put(`${this.apiUrl}/boats/${this.boat.id}`, this.boat, { headers }).subscribe({
      next: () => {
        console.log('Boat updated successfully!');
        this.router.navigate(['/boats']);
      },
      error: (err) => {
        console.error('Error updating boat', err);
      }
    });
  }

  navigateToBoatList(): void {
    this.router.navigate(['/boats']);
  }

}
