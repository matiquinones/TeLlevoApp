import { AjustesComponent } from './backend/ajustes/ajustes.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutorizarGuard } from './guards/autorizar.guard';

const routes: Routes = [
 

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },



  
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate:[AutorizarGuard]
  },


  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
  path: 'misviajes',
  loadChildren: () => import('./pages/misviajes/misviajes.module').then( m => m.MisviajesPageModule),
  canActivate:[AutorizarGuard]
},
{
  path: 'mapa',
  loadChildren: () => import('./pages/mapa/mapa.module').then( m => m.MapaPageModule),
  canActivate:[AutorizarGuard]
},
{
  path: 'miperfil',
  loadChildren: () => import('./pages/miperfil/miperfil.module').then( m => m.MiperfilPageModule),
  canActivate:[AutorizarGuard]
},
/*{
  path: 'manejar',
  loadChildren: () => import('./pages/manejar/manejar.module').then( m => m.ManejarPageModule),
  canActivate:[AutorizarGuard]
},*/
{
path: 'ajustes', component: AjustesComponent
},
  {
    path: 'manejar2',
    loadChildren: () => import('./pages/manejar2/manejar2.module').then( m => m.Manejar2PageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./pages/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
