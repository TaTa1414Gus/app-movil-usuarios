import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  username = '';
  password = '';
  
  userFocus = false;
  passwordFocus = false;

  isTest = false;
  isTestTwo = false;
  isAuthenticating = false;
  hideForm = false;
  isSuccess = false;

  constructor() {}

  doLogin() {
    this.isTest = true;

    setTimeout(() => {
      this.isTestTwo = true;
    }, 300);

    setTimeout(() => {
      this.isAuthenticating = true;
    }, 500);

    setTimeout(() => {
      this.isAuthenticating = false;
      this.isTestTwo = false;
    }, 2500);

    setTimeout(() => {
      this.isTest = false;
      this.hideForm = true; 
    }, 2800);

    setTimeout(() => {
      this.isSuccess = true;
    }, 3200);
  }
}