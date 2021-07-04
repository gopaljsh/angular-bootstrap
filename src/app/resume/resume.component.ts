import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ResumeService } from './resume.service';

import { Resume } from './resume.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-resume',
    templateUrl: './resume.component.html',
    styleUrls: ['./resume.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ResumeComponent implements OnInit, OnDestroy {
    displayResume: string;
    private resumeSub: Subscription;

    constructor(private resumeService: ResumeService) {}

    ngOnInit() {
        this.resumeSub = this.resumeService.getResume()
            .subscribe((resumeContent: {resume: Resume[]}) => {
                this.displayResume = resumeContent.resume[0].resumedata;
            });
    }

    ngOnDestroy() {
        this.resumeSub.unsubscribe();
    }
}
