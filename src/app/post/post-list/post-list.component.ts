import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostServiceComponent } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription;
  isLoading = false;

  constructor(public PostService: PostServiceComponent ) {}

  ngOnInit() {
    this.isLoading = true;
    this.PostService.getPosts();
    this.postsSub = this.PostService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  onDelete(postId: string) {
    this.PostService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
