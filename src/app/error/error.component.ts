import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  title = 'Error';
  list: string[] = [];

  constructor(public bsModalRef: BsModalRef) {}

}
