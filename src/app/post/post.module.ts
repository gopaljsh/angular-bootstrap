import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { NgxBootstrapModule } from '../ngx-bootstrap.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    PostCreateComponent,
    PostListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxBootstrapModule,
    AppRoutingModule
  ]
})
export class PostModule {}
