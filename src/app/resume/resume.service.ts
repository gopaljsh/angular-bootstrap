import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { Resume } from './resume.model';

const BACKEND_URL = environment.apiUrl + '/resume';

@Injectable({
    providedIn: 'root'
})
export class ResumeService {

    constructor(private http: HttpClient, private router: Router) {}

    getResume() {
        return this.http.get<{resume: Resume[]}>(BACKEND_URL);
    }

    postResume(resumedata: string) {
        const resumeData = {
            resumedata: resumedata
        };
        this.http.post(BACKEND_URL + 'post', resumeData)
            .subscribe((res) => {
                this.router.navigate(['/resume']);
            });
    }

    updateResume(resumedata: string, id: string) {
        const updateResume: Resume = {
            resumedata: resumedata,
            _id: id
        };
        this.http.put(BACKEND_URL + '/post/' + id, updateResume)
            .subscribe(res => {
                this.router.navigate(['/resume']);
            });
    }
}
