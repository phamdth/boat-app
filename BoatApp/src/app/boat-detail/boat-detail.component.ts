import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Boat } from '../models/boat';

@Component({
  selector: 'app-boat-detail',
  templateUrl: './boat-detail.component.html',
  styleUrls: ['./boat-detail.component.css']
})
export class BoatDetailComponent implements OnInit {
  boat: Boat | null = null;
  private apiUrl = environment.apiUrl;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadBoat();
  }

  loadBoat(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const token = localStorage.getItem('jwtToken');
      const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();

      this.http.get<Boat>(`${this.apiUrl}/boats/${id}`, { headers }).subscribe({
        next: (data: Boat) => {
          this.boat = data;
        },
        error: (err) => {
          console.error('Error fetching boat details', err);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/boats']);
  }

}


