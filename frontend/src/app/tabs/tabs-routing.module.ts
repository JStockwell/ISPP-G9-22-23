import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'Tabs',
    component: TabsPage,
    children: [
      {
        path: 'Analytics',
        loadChildren: () => import('../pages/analiticas/analiticas.module').then( m => m.AnaliticasPageModule)
      },
      {
        path: 'Analytics/Details/:id/New',
        loadChildren: () => import('../pages/añadir-detalles-analiticas/añadir-detalles-analiticas.module').then(m=>m.AñadirDetallesAnaliticasPageModule)        
      },
      {
      path: 'Analytics/Details/:id',
      loadChildren: () => import('../pages/detalles-analitica/detalles-analitica.module').then( m => m.DetallesAnaliticaPageModule)
      },
      {
        path: 'seccion-fisica',
        loadChildren: () => import('../pages/seccion-fisica/seccion-fisica.module').then( m => m.SeccionFisicaPageModule)
      },
      {
        path: 'DiarioEmocional',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'calendario',
        loadChildren: () => import('../pages/calendario/calendario.module').then( m => m.CalendarioPageModule)
      },
      {
        path: 'Analytics/New',
        loadChildren: () => import('../pages/new-analytic/new-analytic.module').then(m=>m.NewAnalyticPageModule)        
      },
      {
        path: 'seccion-mental/New',
        loadChildren: () => import('../pages/nueva-entrada-mental/nueva-entrada-mental.module').then(m=>m.NuevaEntradaMentalPageModule)        
      },
      {
        path: 'Analytics/Details/:id/Details',
        loadChildren: () => import('../pages/añadir-detalles-analiticas/añadir-detalles-analiticas.module').then(m=>m.AñadirDetallesAnaliticasPageModule)        
      },
      {
        path: 'seccion-fisica/New',
        loadChildren: () => import('../pages/nueva-entrada-fisica/nueva-entrada-fisica.module').then(m=>m.NuevaEntradaFisicaPageModule)        
      },
      {
        path: 'calendario/nueva-cita',
        loadChildren: () => import('../pages/nueva-cita/nueva-cita.module').then(m=>m.NuevaCitaPageModule)        
      },
      {
        path: '',
        redirectTo: '/Tabs/Analytics',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/Tabs/Analytics',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
