import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Manejar2Page } from './manejar2.page';

const routes: Routes = [
  {
    path: '',
    component: Manejar2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Manejar2PageRoutingModule {}
