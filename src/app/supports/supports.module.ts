import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupportsPageRoutingModule } from './supports-routing.module';

import { SupportsPage } from './supports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupportsPageRoutingModule
  ],
  declarations: [SupportsPage]
})
export class SupportsPageModule {}
