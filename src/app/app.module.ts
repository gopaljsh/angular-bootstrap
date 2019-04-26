import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { from } from 'rxjs/internal/observable/from';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxBootstrapModule } from './ngx-bootstrap.module';
import { CKEditorModule } from 'ng2-ckeditor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';

import { BannerComponent } from './banner/banner.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { AboutComponent } from './about/about.component';
import { ResumeComponent } from './resume/resume.component';
import { ContactComponent } from './contact/contact.component';
import { ResumeCreateComponent } from './resume/resume-create/resume-create.component';
import { PostSingleComponent } from './post/post-single/post-single.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    ErrorComponent,
    AboutComponent,
    ResumeComponent,
    ContactComponent,
    ResumeCreateComponent,
    PostSingleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PostModule,
    NgxBootstrapModule,
    HttpClientModule,
    AuthModule,
    CKEditorModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
