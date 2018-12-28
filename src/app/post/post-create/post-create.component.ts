import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from '../post.model';
import { PostServiceComponent } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(public postService: PostServiceComponent) { }

  ngOnInit() {
  }

  onAddPost(Form: NgForm) {
    if (Form.invalid) {
      return;
    }
    const post: Post = {
      id: null,
      title: Form.value.title,
      content: Form.value.content
    };

    this.postService.addPost(Form.value.title, Form.value.content);
    Form.resetForm();
  }

}
