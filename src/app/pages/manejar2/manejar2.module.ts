import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Manejar2PageRoutingModule } from './manejar2-routing.module';

import { Manejar2Page } from './manejar2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Manejar2PageRoutingModule
  ],
  declarations: [Manejar2Page]
})
export class Manejar2PageModule {}
