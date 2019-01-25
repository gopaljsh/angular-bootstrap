import { Component, OnInit } from '@angular/core';
import { AuthServiceComponent } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthServiceComponent) {}

  ngOnInit() {
    console.log(this.authService.getStatus());
    this.authService.autoAuthUser();
  }

}
