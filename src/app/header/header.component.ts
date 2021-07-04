import { Component, OnInit, OnDestroy, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { AuthServiceComponent } from '../auth/auth.service';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userisAuthenticated = false;
  scrollObservable$: Observable<Event>;
  scrollSubscription$: Subscription;
  private userAuthSubscription: Subscription;
  isOpen = false;
  @Output() openMenu: EventEmitter<any> = new EventEmitter();

  constructor(private authService: AuthServiceComponent, private elm: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.userisAuthenticated = this.authService.getStatus();
    this.userAuthSubscription = this.authService.getAuthStatus()
      .subscribe(isAuthenticated => {
        this.userisAuthenticated = isAuthenticated;
      });
      this.scrollObservable$ = fromEvent(window, 'scroll');
      let previousScrollPos = window.pageYOffset;
      console.log(this.elm);
      this.scrollSubscription$ = this.scrollObservable$.subscribe(evt => {
          if (evt) {
              if (window.innerWidth < 768) {
                  let currentScrollPos = window.pageYOffset;
                  if (previousScrollPos > currentScrollPos ) {
                    this.renderer.setStyle(this.elm.nativeElement.children[0], 'bottom', '0');
                  } else {
                    this.renderer.setStyle(this.elm.nativeElement.children[0], 'bottom', '-100px');
                  }
                  previousScrollPos = currentScrollPos;
              } else {
                  //this.mobile = true;
              }
          }
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
    this.scrollSubscription$.unsubscribe();
  }

}
