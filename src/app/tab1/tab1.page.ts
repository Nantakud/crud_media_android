import { Component } from '@angular/core';
import { Media } from '../medias.model';
import { MediasService} from '../medias.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  id:string;
  name:string;
  type:string;
  publisher:string;
  myMedia: Media[];
  isHidden : boolean = true;
  isUnique : boolean;
  displayButton:string = "display";
  isNotValid: boolean;

  constructor(private _mediaService: MediasService, private alertController: AlertController) {}

  ngOnInit(){
    this.myMedia = this._mediaService.getMedias();
  }

  addMedia(){
    this.checkId();
    if(this.isUnique){
      let newMedia:Media = {id:this.id, name: this.name, type: this.type, publisher: this.publisher}
      this.myMedia.push(newMedia);
      this._mediaService.setMedias(this.myMedia);
    } else {
      this.alertMessage();
    }
  }

  displayMedia(){
    this.isHidden=!this.isHidden;
    if(this.isHidden){
      this.displayButton="display";
    } else {
      this.displayButton="hide";
    }
  }

  checkId(){
    this.isUnique = true;
    for(let m of this.myMedia){
      if(m.id == this.id){
        this.isUnique = false;
      }
    }
  }

  async alertMessage() {
    let alert = await this.alertController.create({
      header: 'We got a problem',
      message: 'This ID is already present. Please choose another ID',
      buttons: ['OK']
    });
    await alert.present();
  }


}
