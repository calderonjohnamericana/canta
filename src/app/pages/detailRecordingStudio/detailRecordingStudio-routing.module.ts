import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailRecordingStudioPage } from './detailRecordingStudio.page';

const routes: Routes = [
  {
    path: '',
    component: DetailRecordingStudioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailRecordingStudioPageRoutingModule {}
