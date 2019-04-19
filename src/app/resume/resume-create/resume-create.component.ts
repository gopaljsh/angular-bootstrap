import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { CKEditorComponent } from 'ng2-ckeditor';
import { ResumeService } from '../resume.service';


@Component({
    selector: 'app-resume-create',
    templateUrl: './resume-create.component.html'
})
export class ResumeCreateComponent implements OnInit {
    mycontent = '<p>This is the ckeditor content first text</p>';
    ckeConfig;

    constructor(private resumeService: ResumeService) {}

    ngOnInit() {
        this.ckeConfig = {
            height: 300,
            toolbarGroups: [
                { name: 'document', groups: [ 'mode'] },
                '/',
                { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
                { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
                { name: 'links' },
                { name: 'insert' },
                '/',
                { name: 'styles' },
                { name: 'colors' },
                { name: 'tools' },
                { name: 'others' },
                { name: 'about' }
            ]
          };
    }

    onSubmit(form: NgForm) {
        console.log(form.value.myckeditor);
        if (form.invalid) { return; }
        this.resumeService.postResume(form.value.myckeditor);
        form.reset();
    }
}
