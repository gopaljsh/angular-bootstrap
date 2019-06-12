import { Component, OnInit, HostListener, Input, OnChanges } from '@angular/core';
import { fromEvent } from "rxjs";
import { Observable } from "rxjs";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnChanges {
    resizeObservable$: Observable<Event>;
    resizeSubscription$: Subscription;
    private mobile: boolean = true;
    @Input() listenMenu: boolean;
    
    ngOnInit() {
        if(window.innerWidth < 768) {
            this.mobile = false;
        }
        this.resizeObservable$ = fromEvent(window, 'resize')
        this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
            if(evt) {
                if(window.innerWidth < 768) {
                    this.mobile = false;
                } else {
                    this.mobile = true;
                }
            }
        });
    }

    ngOnChanges() {
        if(this.listenMenu) {
            this.mobile = this.listenMenu;
        console.log(this.listenMenu);
        }
        
    }

}