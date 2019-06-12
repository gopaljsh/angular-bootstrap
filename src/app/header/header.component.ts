import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
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
  isOpen = false;
  @Output() openMenu: EventEmitter<any> = new EventEmitter();

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

  openMenuEmit() {
    this.isOpen = !this.isOpen;
    this.openMenu.emit(this.isOpen);
  }

  ngOnDestroy() {
    this.userAuthSubscription.unsubscribe();
  }

}
