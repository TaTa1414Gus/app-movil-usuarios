import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html', // <-- Corregido para que apunte al html de login
  styleUrls: ['login.page.scss'], // <-- Corregido para que apunte al scss de login
  standalone: true,
  imports: [IonContent, FormsModule, CommonModule]
})
export class LoginPage { // <-- Nombre de clase corregido
  username = '';
  password = '';
  userFocus = false;
  passwordFocus = false;
  
  isTest = false;
  isTestTwo = false;
  isAuthenticating = false;
  hideForm = false;
  isSuccess = false;

  constructor(private router: Router) {}

  async doLogin() {
    if (!this.username || !this.password) return;

    this.isTest = true;
    setTimeout(() => { this.isTestTwo = true; }, 300);
    setTimeout(() => { this.isAuthenticating = true; }, 500);

    try {
      // Apuntando a tu servidor local en XAMPP
      const response = await axios.post('http://localhost/api_movil/login.php', {
        username: this.username,
        password: this.password
      });

      setTimeout(() => {
        this.isAuthenticating = false;
        this.isTestTwo = false;
        
        if (response.data.success) {
          this.isTest = false;
          this.hideForm = true; 
          
          setTimeout(() => {
            this.isSuccess = true;
            // Redirige al Tab1 tras un login exitoso
            setTimeout(() => { this.router.navigate(['/tabs/tab1']); }, 1000);
          }, 400);
        } else {
          // Si falla, revertimos la animación y mostramos el error
          this.isTest = false;
          alert(response.data.message);
        }
      }, 2500);

    } catch (error) {
      console.error('Error HTTP:', error);
      this.isAuthenticating = false;
      this.isTestTwo = false;
      this.isTest = false;
    }
  }
}