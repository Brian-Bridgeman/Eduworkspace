import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {

  username = '';
  password = '';

  constructor(private router: Router) { }

  login() {
    this.router.navigate(['/start']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
