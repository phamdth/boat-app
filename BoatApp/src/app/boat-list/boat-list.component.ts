import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Boat } from '../models/boat';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-boat-list',
  templateUrl: './boat-list.component.html',
  styleUrls: ['./boat-list.component.css']
})
export class BoatListComponent implements OnInit {
  boats: Boat[] = [];
  private apiUrl = `${environment.apiUrl}/boats`;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchBoats();
  }

  fetchBoats(): void {
    const token = localStorage.getItem('jwtToken');
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();

    this.http.get<Boat[]>(this.apiUrl, { headers }).subscribe({
      next: (data: Boat[]) => {
        this.boats = data;
      },
      error: (err) => {
        console.error('Error fetching boats', err);
        if (err.status === 401) {
          // Handle unauthorized access (e.g., redirect to login)
          this.router.navigate(['/login']);
        }
      }
    });
  }

  navigateToAddBoat(): void {
    this.router.navigate(['/add-boat']);
  }

  viewBoatDetails(id: number): void {
    this.router.navigate([`/boat/${id}`]);
  }

  editBoat(id: number): void {
    console.log('Navigating to edit boat with ID:', id);
    this.router.navigate(['/edit-boat', id]);
  }

  deleteBoat(id: number): void {
    const token = localStorage.getItem('jwtToken');
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();

    const url = `${this.apiUrl}/${id}`;
    this.http.delete(url, { headers }).subscribe({
      next: () => {
        this.fetchBoats(); // Refresh the list after deletion
      },
      error: (err) => {
        console.error('Error deleting boat', err);
      }
    });
  }
}
