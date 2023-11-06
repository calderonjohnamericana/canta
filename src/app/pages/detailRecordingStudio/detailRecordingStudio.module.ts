import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailRecordingStudioPageRoutingModule } from './detailRecordingStudio-routing.module';

import { DetailRecordingStudioPage } from './detailRecordingStudio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DetailRecordingStudioPageRoutingModule
  ],
  declarations: [DetailRecordingStudioPage]
})
export class DetailRecordingStudioPageModule {}
