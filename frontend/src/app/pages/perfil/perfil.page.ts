import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IAPProduct, InAppPurchase2 } from '@ionic-native/in-app-purchase-2/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';

const PRODUCT_PREMIUM_KEY = "premium";

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.page.html',
    styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
    id : number | any= 0;
    birthdate: string| any= '';
    tel: string | any = '';
    username: string | any='';
    email: string | any='';
    name: string | any='';
    surname: string | any='';
    code: string| any= '';
    premium_account: string | any = '';

    isModalOpen= false;
    products: IAPProduct[] = [];

    constructor(private plt: Platform, private userService: UsersService, private alertController: AlertController, private store: InAppPurchase2, private ref: ChangeDetectorRef) {
      /* this.plt.ready().then(() => {
        this.store.verbosity = this.store.DEBUG;

        this.registerProducts();
        this.setupListeners();

        this.store.ready(() => {
          this.products = this.store.products;
          this.ref.detectChanges();
        });
      }); */
    }

    ngOnInit(): void {

        this.getInfoUser();

    }

/*     registerProducts() {
      this.store.register({
        id: PRODUCT_PREMIUM_KEY,
        type: this.store.NON_CONSUMABLE,
      });

      this.store.refresh();
    }

    setupListeners() {
      this.store.when('product')
      .approved((p: IAPProduct) => {
        if (p.id === PRODUCT_PREMIUM_KEY) {
          this.premium_account = true;
        }
        this.ref.detectChanges();

        return p.verify();
      })
      .verified((p: IAPProduct) => p.finish());

      this.store.when(PRODUCT_PREMIUM_KEY)
      .owned((p: IAPProduct) => {
        this.premium_account = true;
      })
    }

    purchase(product: IAPProduct) {
      this.store.order(product).then((p: any) => {
        // Purchase in progress!
      }, (e: any) => {
        this.presentAlert('Failed', 'Failed to purchase: ${e}');
      });
    }

    // To comply with AppStore rules
    restore() {
      this.store.refresh();
    }

    async presentAlert(header: any, message: any) {
      const alert = await this.alertController.create({
        header,
        message,
        buttons: ['OK']
      })
    } */

    getUserId(){
        if(this.userService.isLoggedIn()){
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

    getInfoUser() {
        let usuario = this.userService.UserData().subscribe((res)=>{

            this.id=res.id;
            this.birthdate=res.birthdate;
            this.tel= res.tel;
            this.username=res.user.username;
            this.email=res.user.email;
            this.name=res.user.first_name;
            this.surname=res.user.last_name;
            this.code=res.code;
            if(res.premium_account == true){
              this.premium_account="Sí"
            }
            else{
              this.premium_account="No"
            }
          });
    }

    cerrarsesion(){
      
      this.userService.logout().subscribe(
        (data) =>{
          localStorage.clear();
          window.location.href=""
        },
        error =>{
          console.log(error)
        }
        );
      }  


    setOpen(isOpen: boolean) {
      this.isModalOpen = isOpen;
    }

    eliminarUsuario(idEntrada: any) {

      this.userService.deleteUser(idEntrada).subscribe({
        next: res => {
          this.cerrarsesion();
        },error: err => {
          console.log(err)
        }
      })
    }
}