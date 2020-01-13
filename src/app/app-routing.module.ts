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
    path: 'sign-in',
    loadChildren: () => import('./pages/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
 
  {
    path: 'tab', component : TabPage, children : [
      {
        path: 'request',
        loadChildren: () => import('./pages/request/request.module').then( m => m.RequestPageModule)
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
        path: 'index',
        loadChildren: () => import('./pages/index/index.module').then( m => m.IndexPageModule)
      },
    
      {
        path: 'map',
        loadChildren: () => import('./pages/map/map.module').then( m => m.MapPageModule)
      },
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
