import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Resume } from './resume.model';

@Injectable({
    providedIn: 'root'
})
export class ResumeService {

    constructor(private http: HttpClient, private router: Router) {}

    getResume() {
        return this.http.get<{resume: Resume[]}>('http://localhost:3000/api/resume');
    }

    postResume(resumedata: string) {
        const resumeData = {
            resumedata: resumedata
        };
        this.http.post('http://localhost:3000/api/resume/post', resumeData)
            .subscribe((res) => {
                this.router.navigate(['/resume']);
            });
    }

    updateResume(resumedata: string, id: string) {
        const updateResume: Resume = {
            resumedata: resumedata,
            _id: id
        };
        this.http.put('http://localhost:3000/api/resume/post/' + id, updateResume)
            .subscribe(res => {
                this.router.navigate(['/resume']);
            });
    }
}
