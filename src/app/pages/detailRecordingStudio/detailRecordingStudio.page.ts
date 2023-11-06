import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/data/firestore.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detailRecordingStudio.page.html',
  styleUrls: ['./detailRecordingStudio.page.scss'],
})
export class DetailRecordingStudioPage implements OnInit {
  public updateRecordingStudioForm: any;

  recordingStudio: any = {};
  recordingStudioId: any;

  constructor(
    public lc: LoadingController,
    public fs: FirestoreService,
    public fb: FormBuilder,
    public r: Router,
    public ac: AlertController,
    public ar: ActivatedRoute
  ) {
    this.updateRecordingStudioForm = fb.group({
      nameRecording:['',Validators.required],
      typeOfMelody:['',Validators.required],
      numberOfCabins:['',Validators.required],
      owner:['',Validators.required],
    });
  }

  ngOnInit() {
    this.recordingStudioId= this.ar.snapshot.paramMap.get('id');
    console.log('El id es', this.recordingStudioId);
    const desSubscribir = this.fs.getRecordingStudiotDetail('recordingStudioList',this.recordingStudioId).subscribe( result => {
      this.recordingStudio=result;
      desSubscribir.unsubscribe();
    });
  }

  async deleteRecordingStudio(){
    const alert= await this.ac.create({
      message: 'Estas seguro que quieres eliminar el estudio de grabacion',buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: blah => {
            console.log('Comfirm Cancel:  blah');
          },
        },
        {
          text: 'Okay',
          handler: () => {
            this.fs.deleteRecordingStudio(this.recordingStudioId).then(()=>{
              this.r.navigateByUrl('/home');
            });
          },
        },
      ],
    });
    await alert.present();
  }

  async updateRecordingStudio(){
    const loading= await this.lc.create();
    const nameRecording= this.updateRecordingStudioForm.value.nameRecording;
    const typeOfMelody= this.updateRecordingStudioForm.value.typeOfMelody;
    const numberOfCabins= this.updateRecordingStudioForm.value.numberOfCabins;
    const owner= this.updateRecordingStudioForm.value.owner;
    this.fs.updateRecordingStudio(this.recordingStudioId, nameRecording,typeOfMelody,numberOfCabins,owner).then(() => {
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
