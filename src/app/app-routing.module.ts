import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabPage } from './pages/tab/tab.page';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },

  {
    path: 'index',
    loadChildren: () => import('./pages/index/index.module').then( m => m.IndexPageModule)
  },
 
  {
    path: 'tab', component : TabPage, children : [
      {
        path: 'request',
        loadChildren: () => import('./pages/request/request.module').then( m => m.RequestPageModule)
      },
      {
        path: 'sign-in',
        loadChildren: () => import('./pages/sign-in/sign-in.module').then( m => m.SignInPageModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
      },
      {
        path: 'info',
        loadChildren: () => import('./pages/info/info.module').then( m => m.InfoPageModule)
      },
  
    
      {
        path: 'map',
        loadChildren: () => import('./pages/map/map.module').then( m => m.MapPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
      },
    ]
  },
  {
    path: 'forgot-pass',
    loadChildren: () => import('./pages/forgot-pass/forgot-pass.module').then( m => m.ForgotPassPageModule)
  },
  {
    path: 'update-profile',
    loadChildren: () => import('./pages/update-profile/update-profile.module').then( m => m.UpdateProfilePageModule)
  },
 
  {
    path: 'tab', component : TabPage, children : [
      {
        path: 'request',
        loadChildren: () => import('./pages/request/request.module').then( m => m.RequestPageModule)
      },
      {
        path: 'sign-in',
        loadChildren: () => import('./pages/sign-in/sign-in.module').then( m => m.SignInPageModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
      },
      {
        path: 'info',
        loadChildren: () => import('./pages/info/info.module').then( m => m.InfoPageModule)
      },
  
    
      {
        path: 'map',
        loadChildren: () => import('./pages/map/map.module').then( m => m.MapPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
      },
    ]
  },
  {
    path: 'forgot-pass',
    loadChildren: () => import('./pages/forgot-pass/forgot-pass.module').then( m => m.ForgotPassPageModule)
  },
  {
    path: 'install',
    loadChildren: () => import('./pages/install/install.module').then( m => m.InstallPageModule)
  },
  {
    path: 'inspect',
    loadChildren: () => import('./pages/inspect/inspect.module').then( m => m.InspectPageModule)
  },
 

];

 



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
