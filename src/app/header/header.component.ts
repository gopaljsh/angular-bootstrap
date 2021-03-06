import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthServiceComponent } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userisAuthenticated = false;
  private userAuthSubscription: Subscription;

  constructor(private authService: AuthServiceComponent) {}

  ngOnInit() {
    this.userisAuthenticated = this.authService.getStatus();
    this.userAuthSubscription = this.authService.getAuthStatus()
      .subscribe(isAuthenticated => {
        this.userisAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.authService.logoutUser();
  }

  ngOnDestroy() {
    this.userAuthSubscription.unsubscribe();
  }

}
