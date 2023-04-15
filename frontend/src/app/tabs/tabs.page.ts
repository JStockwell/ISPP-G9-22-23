import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { AdMob, BannerAdOptions, BannerAdPosition, BannerAdSize } from '@capacitor-community/admob';
import { isPlatform } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit, OnDestroy{

  isPremium!:boolean

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
    console.log(status)
  }

  async showBanner(){
    const adId = isPlatform('android') ? 'android-banner-id': ''

    const options: BannerAdOptions = {
      adId: adId,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.TOP_CENTER,
      margin: 0,
      isTesting: true
    }

    await AdMob.showBanner(options);
  }

  removeBanner(){
    AdMob.removeBanner();
  }

  ngOnInit(){
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
  }

  ngOnDestroy(){
    this.removeBanner()
  }

}
