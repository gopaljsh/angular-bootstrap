import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  @Output() postCreated = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onAddPost(Form: NgForm) {
    //this.newPost = this.enteredValue;

    const post: Post = {
      title: Form.value.title,
      content: Form.value.content
    };

    this.postCreated.emit(post);
  }

}
