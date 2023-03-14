import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'app',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)

  },
  {
    path: 'detalles-analitica',
    loadChildren: () => import('./pages/detalles-analitica/detalles-analitica.module').then( m => m.DetallesAnaliticaPageModule)
  },
  {
    path: 'seccion-fisica',
    loadChildren: () => import('./pages/seccion-fisica/seccion-fisica.module').then( m => m.SeccionFisicaPageModule)

  },
  {
    path: 'analytics',
    loadChildren: () => import('./pages/analiticas/analiticas.module').then( m => m.AnaliticasPageModule)

  },
  {
    path: 'Diario Emocional',
    loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule)
  },
  {
    path: 'nueva-entrada-fisica',
    loadChildren: () => import('./pages/nueva-entrada-fisica/nueva-entrada-fisica.module').then( m => m.NuevaEntradaFisicaPageModule)
  },
  {  
    path: '',
    loadChildren: () => import('./pagina-inicial/pagina-inicial.module').then( m => m.PaginaInicialPageModule)
  },


  {
    path: 'nueva-entrada-mental',
    loadChildren: () => import('./pages/nueva-entrada-mental/nueva-entrada-mental.module').then( m => m.NuevaEntradaMentalPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
