import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private screenOrientation: ScreenOrientation) {
  }
  
  ngOnInit(){
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
  }
 
}
