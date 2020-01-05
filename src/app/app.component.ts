import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { AuthServiceComponent } from 'src/app/auth/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  menuOpen: boolean;
  constructor(private authService: AuthServiceComponent, private titleService: Title, private meta : Meta) {}

  ngOnInit() {
    this.authService.autoAuthUser();
    this.titleService.setTitle('About us');
    this.meta.addTag({property:'og:title', content:'This is test content'});
    this.meta.addTag({property:'og:description', content:'This is test content'});
    this.meta.addTag({property:'og:image', content:'https://res.cloudinary.com/gopaljsh/image/upload/v1578221243/blog-image/logo-fb.jpg'});
  }

  listenEvent(data: boolean) {
    this.menuOpen = data;
  }

}
