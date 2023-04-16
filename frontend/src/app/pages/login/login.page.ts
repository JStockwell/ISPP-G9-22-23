import { Component, OnInit } from "@angular/core";
import { UsersService } from "../../services/users.service";
import { HttpClient } from "@angular/common/http";
import { ActionSheetController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  form: any = {
    username: null,
    password: null
  };

  
  
  
  presentingElement=document.querySelector('.ct');
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private uService: UsersService, private http: HttpClient, private actionSheetCtrl: ActionSheetController, private navCtrl: NavController) {}
  
  ngOnInit():void {
    if(this.uService.isLoggedIn()){
      this.isLoggedIn=true;
    }
    this.presentingElement = document.querySelector('.ct');
  }

  canDismiss = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'confirm';
  };

  logForm(): void{
    
    this.uService.login(this.form).subscribe({
      next: data => {
        console.log(data)
        this.uService.saveUser(data);
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        window.alert("Credenciales incorrectas");
    }}
    );
  }

  goBack(){
    this.navCtrl.pop(); 
  }

  reloadPage():void{
    window.location.href="app/Tabs/Analytics"
  }

  
  getUserId(){
    if(this.uService.isLoggedIn()){
      var ck = localStorage.getItem('auth-user')
      if(ck != null){
        var tk = JSON.parse(ck);
        var res = [];
        for(var i in tk){
          res.push(tk[i]);
        }
        return res[1];
      }
    }
  }

  

  eliminarUsuario(idEntrada: any) {
    
    this.uService.deleteUser(idEntrada).subscribe({
      next: res => {
        console.log(res);
        document.location.href="/users/register"
        window.location.href = "/users/register"
      },error: err => {
        console.log(err)
      }
    })
  }




}
