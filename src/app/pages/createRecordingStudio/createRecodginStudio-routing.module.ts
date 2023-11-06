import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateRecordingStudioPage } from './createRecordingStudio.page';

const routes: Routes = [
  {
    path: '',
    component: CreateRecordingStudioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateRecordingStudioPageRoutingModule {}
