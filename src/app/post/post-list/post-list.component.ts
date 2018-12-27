import { Component, Input } from '@angular/core';

import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html'
})
export class PostListComponent {
  // posts = [
  //   {title: 'First Post', content: 'This is the First post'},
  //   {title: 'Second Post', content: 'This is the Second post'},
  //   {title: 'Third Post', content: 'This is the Third post'},
  //   {title: 'Fourth Post', content: 'This is the Fourth post'},
  //   {title: 'Fifth Post', content: 'This is the Fifth post'}
  // ];
  @Input() posts: Post[] = [];
}
