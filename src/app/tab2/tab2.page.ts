import { Component } from '@angular/core';
import { MediasService} from '../medias.service';
import { Media } from '../medias.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  selector:string;
  myMedia: Media[];
  mySelection: Media[];
  isHidden: boolean = true;
  criterion: string;


  constructor(private _mediaService: MediasService, private alertController: AlertController) {
    this.mySelection = [];
  }

  ngOnInit(){
    this.myMedia = this._mediaService.getMedias();
  }

  search(){
    let isFound: boolean = false;
    this.myMedia = this._mediaService.getMedias();
    this.resetDatabase();
    if(this.criterion == "name"){ //check if it is a type or a name
      for(let m of this.myMedia){
        if(m.name == this.selector){  // looking for same name
          this.mySelection.push(m);
          isFound = true;
        }
      }
    } else {
      for(let m of this.myMedia){
        if(m.type == this.selector){  // looking for same type
          this.mySelection.push(m);
          isFound = true;
        }
      }
    }
    if(isFound){
      this.isHidden = false;
    } else {
      this.isHidden = true;
      this.alertMessage();
    }
  }

  resetDatabase(){
    this.mySelection.splice(0, this.mySelection.length);
  }

  async alertMessage() {
    let alert = await this.alertController.create({
      header: 'We got a problem',
      message: 'The item you are looking for is not in the Database.',
      buttons: ['OK']
    });
    await alert.present();
  }
}
