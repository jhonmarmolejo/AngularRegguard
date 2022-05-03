import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  public regGuardTimedOut: boolean = false;
  public registrationCompleted: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, email, password } = this.form;

    debugger;
    const Imperium = require('../../assets/registrationguard1.0.js');

    const { imperium } = Imperium;

    imperium.registrationGuard.analyze({
      clientID: "You need to put your CLIENTID here",
      language: 'EN',
      registrationFormID: "UniqueId",
      callback: this.RegistrationComplete
    });
  }

  public RegistrationComplete(data: object): void {
    if (!this.regGuardTimedOut) {
      console.log(data);
      this.registrationCompleted = true;
    }
  }

  // Client will implement appropriate logic is a response is not received from RegGuard within the given time period
  public RegistrationNoResponse(): void {
    if (!this.registrationCompleted) {
      this.regGuardTimedOut = true;
    }
  }
}
