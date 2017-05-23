import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { CardIO } from '@ionic-native/card-io';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cardHolder:string;
  cardNumber: string;
  cvv:string;
  date: string;

  constructor(public navCtrl: NavController, public _cardIO: CardIO, public _toastControl: ToastController) {

  }


presentToast(message: string){
  let toast = this._toastControl.create({
   duration: 4000,
   message: message
  });

  toast.present();
}


  scan(){
    this._cardIO.canScan()
  .then(
    (res: boolean) => {
      if(res){
      
        let options = {
          requireExpiry:true,
          requireCCV: false,
          requireCardholderName:true,
          requirePostalCode: false,
          useCardIOLogo: true,
          guideColor:'#f53d3d',
          keepApplicationTheme:true
        };
        this._cardIO.scan(options)
        .then(res =>{
        
           this.cardHolder = res.cardholderName;
          this.cardNumber = res.cardNumber;
          this.cvv = res.cvv;
          this.date = res.expiryMonth +'/'+ res.expiryYear;
        })
        .catch(err => {
            this.presentToast('card io not available');
        });
      }
    }
  );

  }
}
