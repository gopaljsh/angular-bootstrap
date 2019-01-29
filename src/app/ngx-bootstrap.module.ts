import { NgModule } from '@angular/core';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    PaginationModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [
    PaginationModule,
    ModalModule
  ]
})
export class NgxBootstrapModule {}
