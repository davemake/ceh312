import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HostsPage } from './hosts';

@NgModule({
  declarations: [
    HostsPage,
  ],
  imports: [
    IonicPageModule.forChild(HostsPage),
  ],
  exports: [
    HostsPage
  ]
})
export class HostsPageModule {}
