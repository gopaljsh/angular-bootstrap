import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostListComponent } from './post/post-list/post-list.component';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { AboutComponent } from './about/about.component';
import { ResumeComponent } from './resume/resume.component';
import { ContactComponent } from './contact/contact.component';
import { ResumeCreateComponent } from './resume/resume-create/resume-create.component';
import { PostSingleComponent } from './post/post-single/post-single.component';

const routes: Routes = [
  {path: '', component: AboutComponent},
  {path: 'blog', component: PostListComponent},
  {path: 'resume', component: ResumeComponent},
  {path: 'resume/create', component: ResumeCreateComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'create', component: PostCreateComponent},
  {path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard]},
  {path: 'post/:singleId', component: PostSingleComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
