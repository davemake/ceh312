import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DevelopersPage } from './developers';

@NgModule({
  declarations: [
    DevelopersPage,
  ],
  imports: [
    IonicPageModule.forChild(DevelopersPage),
  ],
  exports: [
    DevelopersPage
  ]
})
export class DevelopersPageModule {}
