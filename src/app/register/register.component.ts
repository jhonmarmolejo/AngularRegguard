import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

declare var imperium: any;

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

    imperium.registrationGuard.analyze({
      clientID: '4082C877-C7C1-11EC-A210-1264B5C78F33',
      language: 'EN',
      registrationFormID: 'MyUniqueFormId',
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
