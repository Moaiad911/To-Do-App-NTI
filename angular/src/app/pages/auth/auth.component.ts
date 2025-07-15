import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  loginEmail = '';
  loginPassword = '';
  signupName = '';
  signupEmail = '';
  signupPassword = '';

  constructor(private authService: AuthService) {}

  login() {
    alert('Login clicked');
  }

  signup() {
    alert('Signup clicked');
  }
}



