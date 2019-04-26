import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-post-single',
    templateUrl: './post-single.component.html'
})
export class postSingleComponent implements OnInit {
    constructor(private route: ActivatedRoute) {}
    ngOnInit() {
        
    }
}