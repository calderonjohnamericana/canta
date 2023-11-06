import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import { LoadingController,AlertController} from '@ionic/angular';
import {FirestoreService  } from '../../services/data/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './createRecordingStudio.page.html',
  styleUrls: ['./createRecordingStudio.page.scss'],
})
export class CreateRecordingStudioPage implements OnInit {

  public createRecordingStudioForm: any;

  constructor(
    public lc: LoadingController,
    public ac: AlertController,
    public fs: FirestoreService,
    public fb: FormBuilder,
    public r: Router
  ) {
    this.createRecordingStudioForm = fb.group({
      nameRecording:['',Validators.required],
      typeOfMelody:['',Validators.required],
      numberOfCabins:['',Validators.required],
      owner:['',Validators.required],
    });
  }

  ngOnInit() {
  }

  async createRecordingStudio(){
    const loading= await this.lc.create();
    const nameRecording= this.createRecordingStudioForm.value.nameRecording;
    const typeOfMelody= this.createRecordingStudioForm.value.typeOfMelody;
    const numberOfCabins= this.createRecordingStudioForm.value.numberOfCabins;
    const owner= this.createRecordingStudioForm.value.owner;
    this.fs.createRecordingStudio(nameRecording,typeOfMelody,numberOfCabins,owner).then(() => {
      loading.dismiss().then(() => {
        this.r.navigateByUrl('/home');
      });
    },
    error => {
      console.error(error);
    });
    return await loading.present();
  }
}
