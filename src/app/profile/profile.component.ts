import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnChanges, OnDestroy {
    resizeObservable$: Observable<Event>;
    resizeSubscription$: Subscription;
    private mobile = true;
    @Input() listenMenu: boolean;

    ngOnInit() {
        if (window.innerWidth < 768) {
            this.mobile = false;
        }
        this.resizeObservable$ = fromEvent(window, 'resize');
        this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
            if (evt) {
                if (window.innerWidth < 768 && !this.listenMenu) {
                    this.mobile = false;
                } else {
                    this.mobile = true;
                }
            }
        });
    }

    ngOnChanges() {
      if (this.listenMenu !== undefined) {
        this.mobile = this.listenMenu;
      }
    }

    ngOnDestroy() {
        this.resizeSubscription$.unsubscribe();
    }

}
