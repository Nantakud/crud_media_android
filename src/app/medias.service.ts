import { Injectable } from '@angular/core';
import { Media } from './medias.model';

@Injectable()
export class MediasService {
  medias: Media[];

  constructor() { 
    this.medias = [];
  }

  getMedias(){
    return this.medias;
  }

  setMedias(m: Media[]){
    this.medias = m;
  }
}
