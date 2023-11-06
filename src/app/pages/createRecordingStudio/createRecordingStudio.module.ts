import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateRecordingStudioPageRoutingModule } from './createRecodginStudio-routing.module';

import { CreateRecordingStudioPage } from './createRecordingStudio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    IonicModule,
    CreateRecordingStudioPageRoutingModule
  ],
  declarations: [CreateRecordingStudioPage]
})
export class CreateRecordingStudioPageModule {}
