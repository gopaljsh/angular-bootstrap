import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { PostServiceComponent } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-post-single',
    templateUrl: './post-single.component.html',
    styleUrls: ['./post-single.component.css']
})
export class PostSingleComponent implements OnInit, OnDestroy {
    private postId: string;
    post: Post;
    isLoading = false;
    private postSub: Subscription;

    constructor(public route: ActivatedRoute, private postService: PostServiceComponent) {}

    ngOnInit() {
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('singleId')) {
          this.postId = paramMap.get('singleId');
          this.isLoading = true;
          this.postSub = this.postService.getPost(this.postId)
            .subscribe((postData) => {
              this.isLoading = false;
              this.post = {
                id: postData._id,
                title: postData.title,
                content: postData.content,
                imagePath: postData.imagePath,
                creator: postData.creator
              };
            });
        }
      });
    }

    ngOnDestroy() {
      this.postSub.unsubscribe();
    }

}
