import { HttpClient } from '@angular/common/http';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AñadirDetallesAnaliticasService } from 'src/app/services/añadir-detalles-analiticas.service';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';
registerLocaleData(localeEs, 'es');
import { ModificarDetallesService} from 'src/app/services/modificar-detalles.service';

@Component({
  selector: 'app-modificar-detalles',
  templateUrl: './modificar-detalles.page.html',
  styleUrls: ['./modificar-detalles.page.scss'],

})

export class ModificarDetallesPage implements OnInit{

  entrada!: EntradaAnalitica
  valor:  string | any='';



  constructor(private route: ActivatedRoute, private service:ModificarDetallesService, private navCtrl: NavController, private uService: UsersService ) {}

  form:any ={
    valor:null
  }

  getIdUser(){
    if(this.uService.isLoggedIn()){
      var ck = window.sessionStorage.getItem('auth-user')
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
  ngOnInit() {

    let id = this.route.snapshot.paramMap.get('id')
    this.service.getEntradasAnaliticas(id).subscribe({
      next:data=>{
        this.entrada = data as EntradaAnalitica;
        this.valor = this.entrada.value;
  },
    error:err=>{
        console.log(err.error.message);
  }
})
}

modificarDetalles():void{

    let dataEntry: any;

    dataEntry = {
      id: this.route.snapshot.paramMap.get('id'),
      value : this.valor,
      patient_id: this.service.getIdUser(),

    };

    this.service.modifyDetalles(this.route.snapshot.paramMap.get('id'),dataEntry).subscribe({
        next:data=>{
          window.location.href = '/app/Tabs/Analytics';
        },
        error:err=>{
          console.log(err.error.message);
        }
      })

      console.log(dataEntry);
}
goBack(){
    this.navCtrl.pop(); 
}



}

type EntradaAnalitica = {
    id: any,
    value: string,
    patient_id: null,

  }