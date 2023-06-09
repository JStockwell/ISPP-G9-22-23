import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {  
    path: '',
    loadChildren: () => import('./pagina-inicial/pagina-inicial.module').then( m => m.PaginaInicialPageModule)
  },
  {  
    path: 'users/preferences',
    loadChildren: () => import('./pages/preferencias-de-usuario/preferencias-de-usuario.module').then( m => m.PreferenciasDeUsuarioPageModule)
  },
  {
    path: 'users/register',
    loadChildren: () => import('./pages/users/users.module').then(m=>m.UsersPageModule)
  },
  {
    path: 'medics/register',
    loadChildren: () => import('./pages/medics/medics.module').then(m=>m.MedicsPageModule)
  },
  {
    path: 'users/login',
    loadChildren: () => import('./pages/login/login.module').then(m=>m.LoginPageModule)
  },  
  {
    path: 'medic/home',
    loadChildren: () => import('./pages/medic-home/medic-home.module').then(m=>m.MedicHomePageModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'Details/:id',
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
    path: 'modificar-mental',
    loadChildren: () => import('./pages/modificar-mental/modificar-mental.module').then( m => m.ModificarMentalPageModule)
  },
  
  {
    path: 'nueva-entrada-fisica',
    loadChildren: () => import('./pages/nueva-entrada-fisica/nueva-entrada-fisica.module').then( m => m.NuevaEntradaFisicaPageModule)
  },

  {
    path: 'users/medics/patients/New',
    loadChildren: () => import('./pages/nuevo-paciente-medico/nuevo-paciente-medico.module').then( m => m.NuevoPacienteMedicoPageModule)
  },
  {
    path: 'nueva-entrada-mental',
    loadChildren: () => import('./pages/nueva-entrada-mental/nueva-entrada-mental.module').then( m => m.NuevaEntradaMentalPageModule)
  },
  {
    path: 'añadir-detalles-analiticas',
    loadChildren: () => import('./pages/añadir-detalles-analiticas/añadir-detalles-analiticas.module').then( m => m.AñadirDetallesAnaliticasPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },

  {
    path: 'calendario',
    loadChildren: () => import('./pages/calendario/calendario.module').then( m => m.CalendarioPageModule)
  },
  {
    path: 'nueva-cita',
    loadChildren: () => import('./pages/nueva-cita/nueva-cita.module').then( m => m.NuevaCitaPageModule)
  },
  {
    path: 'modificar-fisico',
    loadChildren: () => import('./pages/modificar-fisico/modificar-fisico.module').then( m => m.ModificarFisicoPageModule)
  },
  {
    path: 'modificar-detalles',
    loadChildren: () => import('./pages/modificar-detalles/modificar-detalles.module').then( m => m.ModificarDetallesPageModule)

  },
  {
    path: 'modificar-cita',
    loadChildren: () => import('./pages/modificar-cita/modificar-cita.module').then( m => m.ModificarCitaPageModule)
  },
  {
    path: 'detalles-cita',
    loadChildren: () => import('./pages/detalles-cita/detalles-cita.module').then( m => m.DetallesCitaPageModule)
  },
  {
    path: 'medic-home',
    loadChildren: () => import('./pages/medic-home/medic-home.module').then( m => m.MedicHomePageModule)

  },
  {
    path: 'preferencias-de-usuario',
    loadChildren: () => import('./pages/preferencias-de-usuario/preferencias-de-usuario.module').then( m => m.PreferenciasDeUsuarioPageModule)
  },
  {
    path: 'modificar-perfil',
    loadChildren: () => import('./pages/modificar-perfil/modificar-perfil.module').then( m => m.ModificarPerfilPageModule)
  },
  {
  path: 'perfil-de-usuario',
  loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'editar-datos-perfil',
    loadChildren: () => import('./pages/modificar-perfil/modificar-perfil.module').then(m => m.ModificarPerfilPageModule)
  },

  {

    path: 'medic-home',
    loadChildren: () => import('./pages/medic-home/medic-home.module').then( m => m.MedicHomePageModule)

  },
  {
    path: 'info',
    loadChildren: () => import('./pages/info/info.module').then( m => m.InfoPageModule)
  },

  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },

  {
    path: 'calendario',
    loadChildren: () => import('./pages/calendario/calendario.module').then( m => m.CalendarioPageModule)
  },
  {
    path: 'nueva-cita',
    loadChildren: () => import('./pages/nueva-cita/nueva-cita.module').then( m => m.NuevaCitaPageModule)
  },
  {
    path: 'modificar-fisico',
    loadChildren: () => import('./pages/modificar-fisico/modificar-fisico.module').then( m => m.ModificarFisicoPageModule)
  },
  {
    path: 'modificar-detalles',
    loadChildren: () => import('./pages/modificar-detalles/modificar-detalles.module').then( m => m.ModificarDetallesPageModule)

  },
  {
    path: 'modificar-cita',
    loadChildren: () => import('./pages/modificar-cita/modificar-cita.module').then( m => m.ModificarCitaPageModule)
  },
  {
    path: 'detalles-cita',
    loadChildren: () => import('./pages/detalles-cita/detalles-cita.module').then( m => m.DetallesCitaPageModule)
  },
  {
    path: 'medic-home',
    loadChildren: () => import('./pages/medic-home/medic-home.module').then( m => m.MedicHomePageModule)

  },
  {
    path: 'preferencias-de-usuario',
    loadChildren: () => import('./pages/preferencias-de-usuario/preferencias-de-usuario.module').then( m => m.PreferenciasDeUsuarioPageModule)
  },
    {
    path: 'perfil-de-usuario',
    loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilPageModule)
    },
  {

    path: 'medic-home',
    loadChildren: () => import('./pages/medic-home/medic-home.module').then( m => m.MedicHomePageModule)

  },
  {
    path: 'medic/home/patient/:id',
    loadChildren: () => import('./pages/patient/patient.module').then( m => m.PatientPageModule)
  },
  {
    path: 'medic/home/patient/:id/seccion-fisica',
    loadChildren: () => import('./pages/medico-seccion-fisica/medico-seccion-fisica.module').then( m => m.MedicoSeccionFisicaPageModule)
  },
  {
    path: 'medic/home/patient/:id/seccion-mental',
    loadChildren: () => import('./pages/medico-seccion-mental/medico-seccion-mental.module').then( m => m.MedicoSeccionMentalPageModule)
  },

  {
    path: 'medico-seccion-mental/:id',
    loadChildren: () => import('./pages/medico-diario-mental-detalles/medico-diario-mental-detalles.module').then( m => m.MedicoDiarioMentalDetallesPageModule)
  },

  {
    path: 'medico-seccion-fisico/:id',
    loadChildren: () => import('./pages/medico-diario-fisico-detalles/medico-diario-fisico-detalles.module').then( m => m.MedicoDiarioFisicoDetallesPageModule)
  },
  {
    path: 'medic/home/patient/:id/medico-analiticas',
    loadChildren: () => import('./pages/medico-analiticas/medico-analiticas.module').then( m => m.MedicoAnaliticasPageModule)
  },
  {
    path: 'tyc',
    loadChildren: () => import('./pages/tyc/tyc.module').then( m => m.tycPageModule)
  },

  {
    path: 'medico-detalles-analiticas/:id/:patientid',
    loadChildren: () => import('./pages/medico-detalles-analitica/medico-detalles-analitica.module').then( m => m.MedicoAnaliticasDetallesPageModule)
  },




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

