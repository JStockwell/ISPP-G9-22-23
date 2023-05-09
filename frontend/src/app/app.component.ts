import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { AdMob, BannerAdOptions, BannerAdPosition, BannerAdSize } from '@capacitor-community/admob';
import { isPlatform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  
  isPremium:boolean=true

  constructor(private uService:UsersService) {
    this.initialize()
  }

  async initialize(){
    const { status } = await AdMob.trackingAuthorizationStatus();
    AdMob.initialize({
      requestTrackingAuthorization: true,
      testingDevices:['YOURTESTINGDEVICE'],
      initializeForTesting: true
    })

  }

  async showBanner(){
    const adId = isPlatform('android') ? 'android-banner-id': 'ios-banner-id'

    const options: BannerAdOptions = {
      adId: adId,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: true
    }

    await AdMob.showBanner(options);
  }

  removeBanner(){
    AdMob.removeBanner();
  }

  ngOnInit(){
    if(this.uService.isLoggedIn()){
      this.uService.getUserData().subscribe({
        next:data=>{
          this.isPremium=data.premium_account
          if(!this.isPremium){
            this.showBanner()
          }else{
            this.removeBanner()
          }
        },
        error:err=>{
          console.log(err)
        }
      })
    }else{
      this.removeBanner()
    }
  }

  ngOnDestroy(){
    this.removeBanner()
  }
 
}
