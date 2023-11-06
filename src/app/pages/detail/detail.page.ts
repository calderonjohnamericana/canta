import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/data/firestore.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public updateSongForm: any;

  song: any = {};
  songId: any;

  constructor(
    public lc: LoadingController,
    public fs: FirestoreService,
    public fb: FormBuilder,
    public r: Router,
    public ac: AlertController,
    public ar: ActivatedRoute
  ) {
    this.updateSongForm = fb.group({
      albumName:['',Validators.required],
      artistName:['',Validators.required],
      songDescription:['',Validators.required],
      songName:['',Validators.required],
    });
  }

  ngOnInit() {
    this.songId= this.ar.snapshot.paramMap.get('id');
    console.log('El id es', this.songId);
    const desSubscribir = this.fs.getSongtDetail('songList',this.songId).subscribe( result => {
      this.song=result;
      desSubscribir.unsubscribe();
    });
  }

  async deleteSong(){
    const alert= await this.ac.create({
      message: 'Estas seguro que quieres eliminar la canción',buttons: [
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
            this.fs.deleteSong(this.songId).then(()=>{
              this.r.navigateByUrl('/home');
            });
          },
        },
      ],
    });
    await alert.present();
  }

  async updateSong(){
    const loading= await this.lc.create();
    const albumName= this.updateSongForm.value.albumName;
    const artistName= this.updateSongForm.value.artistName;
    const songDescription= this.updateSongForm.value.songDescription;
    const songName= this.updateSongForm.value.songName;
    this.fs.updateSong(this.songId, albumName,artistName,songDescription,songName).then(() => {
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
