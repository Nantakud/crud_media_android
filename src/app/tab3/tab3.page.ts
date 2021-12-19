import { Component } from '@angular/core';
import { MediasService} from '../medias.service';
import { Media } from '../medias.model';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  id:string;
  name:string;
  type:string;
  publisher:string;
  myMedia: Media[];
  isHidden = true;
  displayButton:string = "display";


  constructor(private _mediaService: MediasService, private alertController: AlertController) {}
  
  ngOnInit(){
    this.myMedia = this._mediaService.getMedias();
  }

  updateMedia(){
    let updated: boolean = false;
    for(let m of this.myMedia){
      if(m.id == this.id){
        let newMedia:Media = {id:this.id, name: this.name, type: this.type, publisher: this.publisher}
        this.myMedia.splice(this.myMedia.indexOf(m),1,newMedia);
        this._mediaService.setMedias(this.myMedia);
        updated = true;
      }
    }
    if(!(updated)){
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

  async alertMessage() {
    let alert = await this.alertController.create({
      header: 'We got a problem',
      message: 'There is not media with id:' + this.id,
      buttons: ['OK']
    });
    await alert.present();
  }

}