import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostServiceComponent } from '../post.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'First Post', content: 'This is the First post'},
  //   {title: 'Second Post', content: 'This is the Second post'},
  //   {title: 'Third Post', content: 'This is the Third post'},
  //   {title: 'Fourth Post', content: 'This is the Fourth post'},
  //   {title: 'Fifth Post', content: 'This is the Fifth post'}
  // ];
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public PostService: PostServiceComponent ) {}

  ngOnInit() {
    this.posts = this.PostService.getPost();
    this.postsSub = this.PostService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }


}
