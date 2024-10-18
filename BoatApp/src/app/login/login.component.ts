import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  private apiUrl = `${environment.apiUrl}/auth/login`;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('jwtToken')) {
      this.router.navigate(['/boats']);
    }
  }

  login() {
    const loginData = { username: this.username, password: this.password };

    this.http.post<any>(this.apiUrl, loginData).subscribe({
      next: (response) => {
        localStorage.setItem('jwtToken', response.token);
        this.router.navigate(['/boats']);
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }
}
