import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Quiz } from './quiz.model';

@Injectable({
    providedIn: 'root'
})
export class QuizService {
    private _javascripturl = 'http://localhost:4200/assets/data/javascript.json';

    constructor(private http: HttpClient) {}

    getData() {
     return this.http.get<Quiz[]>(this._javascripturl)
    }
}