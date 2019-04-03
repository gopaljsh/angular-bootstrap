import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { CKEditorComponent } from 'ng2-ckeditor'
import { ResumeService } from '../resume.service';


@Component({
    selector: 'app-resume-create',
    templateUrl: './resume-create.component.html'
})
export class ResumeCreateComponent implements OnInit {
    // ckeditorContent: string = '<p>This is the ckeditor content first text</p>';
    // @ViewChild(CKEditorComponent) ckEditor: CKEditorComponent;
    name = 'ng2-ckeditor';
    mycontent: string = '<p>This is the ckeditor content first text</p>';
    log: string = '';
    @ViewChild("myckeditor") ckeditor: CKEditorComponent;
    ckeConfig: any;

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
        console.log(form.value.myckeditor)
        // if(this.resumeForm.invalid) {
        //     return;
        // }
        //this.resumeContent = this.resumeForm.get('editor').value;
        //this.resumeService.postResume(this.resumeContent);
        //this.resumeForm.reset();
    }
}