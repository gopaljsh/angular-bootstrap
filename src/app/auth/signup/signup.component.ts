import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceComponent } from '../auth.service';

@Component({
  templateUrl: './signup.component.html'
})
export class SignUpComponent {
  isLoading = false;

  constructor(private authService: AuthServiceComponent) {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.authService.createUser(form.value.email, form.value.password);
  }
}
