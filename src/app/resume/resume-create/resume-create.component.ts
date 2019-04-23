import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { CKEditorComponent } from 'ng2-ckeditor';
import { ResumeService } from '../resume.service';

import { Resume } from '../resume.model';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-resume-create',
    templateUrl: './resume-create.component.html'
})
export class ResumeCreateComponent implements OnInit, OnDestroy {
    mycontent = '<p>This is the ckeditor content first text</p>';
    id: string;
    private resumeSub: Subscription;
    @ViewChild('myckeditor') myCKeditor: CKEditorComponent;

    constructor(private resumeService: ResumeService) {

    }

    ngOnInit() {
        this.resumeSub = this.resumeService.getResume()
            .subscribe((resumeContent: {resume: Resume[]}) => {
                if (!resumeContent.resume) {
                    this.id = null;
                } else {
                    this.mycontent = resumeContent.resume[0].resumedata;
                    this.id = resumeContent.resume[0]._id;
                }
            });
        this.myCKeditor.config = {
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
            ],
            extraPlugins: 'divarea'
          };
    }

    onSubmit(form: NgForm) {
        if (form.invalid) { return; }
        if (!this.id) {
            this.resumeService.postResume(form.value.myckeditor);
        } else {
            this.resumeService.updateResume(form.value.myckeditor, this.id);
        }
        form.reset();
    }

    ngOnDestroy() {
        this.resumeSub.unsubscribe();
    }
}
