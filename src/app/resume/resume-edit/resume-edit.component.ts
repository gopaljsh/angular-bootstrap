import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-resume-edit',
    templateUrl: './resume-edit.component.html'
})
export class ResumeEditComponent implements OnInit {
    resumeForm: FormGroup;
    display: string;

    config = {
        toolbar: [
            ['bold', 'italic', 'underline']
        ]
    }

    ngOnInit() {
        this.resumeForm = new FormGroup({
            'editor': new FormControl(null)
        });
    }

    onSubmit() {
        console.log(this.resumeForm.get('editor').value);
        this.display = this.resumeForm.get('editor').value;
    }
}