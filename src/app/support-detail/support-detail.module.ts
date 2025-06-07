import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupportDetailPageRoutingModule } from './support-detail-routing.module';

import { SupportDetailPage } from './support-detail.page';


import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupportDetailPageRoutingModule,
    SharedModule 
  ],
  declarations: [SupportDetailPage]
})
export class SupportDetailPageModule {}
