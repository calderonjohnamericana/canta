import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import {Song} from '../../song';
import {RecordingStudio} from '../../recordingStudios';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor( public firestore: AngularFirestore) { }

  createSong(albumName: string, artistName: string, songDescription: string,songName: string): Promise<void>
  {
    const id= this.firestore.createId();
    return this.firestore.doc(`songList/${id}`).set({id,albumName,artistName,songDescription,songName});
  }

  updateSong(id: any, albumName: string, artistName: string, songDescription: string,songName: string): Promise<void>
  {
    return this.firestore.doc(`songList/${id}`).set({id,albumName,artistName,songDescription,songName});
  }

  getSongList(): AngularFirestoreCollection<Song>{
    return this.firestore.collection('songList');
  }

  getSongtDetail(path: string, songId: string){
    const value=this.firestore.collection(path);
    return value.doc(songId).valueChanges();
  }

  deleteSong(songId: string): Promise<void>{
    return this.firestore.doc(`songList/${songId}`).delete();
  }

  // recording studio
  createRecordingStudio(nameRecording: string, typeOfMelody: string, numberOfCabins: string, owner: string): Promise<void>
  {
    const id= this.firestore.createId();
    return this.firestore.doc(`recordingStudioList/${id}`).set({id,nameRecording, typeOfMelody, numberOfCabins, owner});
  }

  updateRecordingStudio(id: any, nameRecording: string, typeOfMelody: string, numberOfCabins: string, owner: string): Promise<void>
  {
    return this.firestore.doc(`recordingStudioList/${id}`).set({id, nameRecording, typeOfMelody, numberOfCabins, owner});
  }

  getRecordingStudioList(): AngularFirestoreCollection<RecordingStudio>{
    return this.firestore.collection('recordingStudioList');
  }

  getRecordingStudiotDetail(path: string, recordingStudioId: string){
    const value=this.firestore.collection(path);
    return value.doc(recordingStudioId).valueChanges();
  }

  deleteRecordingStudio(recordingStudioId: string): Promise<void>{
    return this.firestore.doc(`recordingStudioList/${recordingStudioId}`).delete();
  }
}
