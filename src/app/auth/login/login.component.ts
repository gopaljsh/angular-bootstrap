import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceComponent } from '../auth.service';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  isLoading = false;

  constructor(private authService: AuthServiceComponent) {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.loginUser(form.value.email, form.value.password);
  }
}
