import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

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

  constructor(public postService: PostServiceComponent, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId)
          .subscribe((postData) => {
            this.isLoading = false;
            this.post = {id: postData._id, title: postData.title, content: postData.content};
          });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
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

    if (this.mode === 'create') {
      this.postService.addPost(Form.value.title, Form.value.content);
      Form.resetForm();
    } else {
      this.postService.updatedPost(this.postId, Form.value.title, Form.value.content);
      Form.resetForm();
    }

  }

}
