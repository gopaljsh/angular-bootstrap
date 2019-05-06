import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CKEditorComponent } from 'ng2-ckeditor';

import { Post } from '../post.model';
import { PostServiceComponent } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  private mode = 'create';
  private postId: string;
  post: Post;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  config;
  @ViewChild('myckeditor') myCKeditor: CKEditorComponent;

  constructor(public postService: PostServiceComponent, public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      'title': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      'content': new FormControl(null, {validators: [Validators.required]}),
      'image': new FormControl(null, {validators: [Validators.required]}),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId)
          .subscribe((postData) => {
            this.isLoading = false;
            this.post = {
              id: postData._id,
              title: postData.title,
              content: postData.content,
              imagePath: postData.imagePath,
              creator: postData.creator
            };
            this.form.setValue({
              'title': this.post.title,
              'content': this.post.content,
              'image': this.post.imagePath
            });
            this.imagePreview = this.post.imagePath;
          });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });

    this.config = {
      height: 200,
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

  onAddPost() {
    this.isLoading = true;
    if (this.form.invalid) {
      return;
    }

    if (this.mode === 'create') {
      this.postService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
    } else {
      this.postService.updatedPost(this.postId, this.form.value.title, this.form.value.content, this.form.value.image);
      this.isLoading = false;
    }
    this.form.reset();
  }

}
