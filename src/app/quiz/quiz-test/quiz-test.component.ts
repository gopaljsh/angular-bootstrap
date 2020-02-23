import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuizService } from '../quiz.service';
import { Quiz } from '../quiz.model';

@Component({
    selector: 'app-quiz-test',
    templateUrl: './quiz-test.component.html',
    styleUrls: ['./quiz-test.component.css']
})
export class QuizTestComponent implements OnInit {
    congratulations: boolean = false;
    javascript: Quiz[];

    constructor(private quizService: QuizService) {}

    ngOnInit() {
        this.quizService.getData()
        .subscribe((response) => {
            this.javascript = response;
        });
    }

    checkResult(form) {
     let javascripts = Object.keys(form.value)
        .map((key, index) => {
            this.javascript[index].incorrect = (form.value[key] != this.javascript[index].correctanswer);
            return this.javascript[index];
        });
     return javascripts;
    }

    onSubmit(form: NgForm) {
        let getResult = this.checkResult(form);
        this.javascript = getResult;
        for (let script of this.javascript) {
            if (script.incorrect) {
                this.congratulations = false;
             } else {
                this.congratulations = true;
             }
        }
    }
}