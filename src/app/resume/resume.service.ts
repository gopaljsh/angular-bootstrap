import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Resume } from './resume.model';

@Injectable({
    providedIn: 'root'
})
export class ResumeService {

    constructor(private http: HttpClient) {}

    getResume() {
        return this.http.get<{resume: Resume[]}>('http://localhost:3000/api/resume');
    }

    postResume(resumedata: string) {
        const resumeData = {
            resumedata: resumedata
        };
        this.http.post('http://localhost:3000/api/resume/post', resumeData)
            .subscribe((res) => {
                console.log(res);
            });
    }
}
