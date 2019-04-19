import { Component, OnInit } from '@angular/core';
import { ResumeService } from './resume.service';

import { Resume } from './resume.model';

@Component({
    selector: 'app-resume',
    templateUrl: './resume.component.html'
})
export class ResumeComponent implements OnInit {
    displayResume: string;

    constructor(private resumeService: ResumeService) {}

    ngOnInit() {
        this.resumeService.getResume()
            .subscribe((resumeContent: {resume: Resume[]}) => {
              this.displayResume = resumeContent.resume[0].resumedata;
            });
    }
}
