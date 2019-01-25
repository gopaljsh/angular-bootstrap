import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

import { Post } from '../post.model';
import { PostServiceComponent } from '../post.service';
import { AuthServiceComponent } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription;
  isLoading = false;
  totalPosts = 0;
  postPerPage = 5;
  currentPage = 1;
  numberOfPosts: number;
  userIsAuthenticated = false;
  userId: string;
  private authStatusSub: Subscription;

  constructor(public PostService: PostServiceComponent, private authService: AuthServiceComponent ) {}

  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.PostService.getPosts(this.postPerPage, this.currentPage);
    this.postsSub = this.PostService.getPostUpdateListener()
      .subscribe((postData: {posts: Post[], postCount: number}) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
        this.numberOfPosts = this.posts.length;
      });
    this.userIsAuthenticated = this.authService.getStatus();
    this.authStatusSub = this.authService.getAuthStatus()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onDelete(postId: string) {
    this.PostService.deletePost(postId)
      .subscribe(() => {
        this.PostService.getPosts(this.postPerPage, this.currentPage);
      });
  }

  pageChanged(pageData: PageChangedEvent): void {
    this.currentPage = pageData.page;
    this.PostService.getPosts(this.postPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
