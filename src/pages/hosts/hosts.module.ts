import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HostsPage } from './hosts';

@NgModule({
  declarations: [
    HostsPage,
  ],
  imports: [
    IonicModule.forChild(HostsPage),
  ],
  exports: [
    HostsPage
  ]
})
export class HostsPageModule {}
