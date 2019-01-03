import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

import { Post } from '../post.model';
import { PostServiceComponent } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription;
  isLoading = false;
  totalPosts = 30;
  postPerPage = 1;
  currentPage = 1;

  constructor(public PostService: PostServiceComponent ) {}

  ngOnInit() {
    this.isLoading = true;
    this.PostService.getPosts(this.postPerPage, this.currentPage);
    this.postsSub = this.PostService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  onDelete(postId: string) {
    this.PostService.deletePost(postId);
  }

  pageChanged(pageData: PageChangedEvent): void {
    this.currentPage = pageData.page;
    this.PostService.getPosts(this.postPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
