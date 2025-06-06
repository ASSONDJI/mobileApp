import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [  
  {
    path: '',
    redirectTo: 'home',  
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'produit',
    loadChildren: () => import('./produit/produit.module').then(m => m.ProduitPageModule)
  },
  {
    path: 'supports',
    loadChildren: () => import('./supports/supports.module').then( m => m.SupportsPageModule)
  },  {
    path: 'support-detail',
    loadChildren: () => import('./support-detail/support-detail.module').then( m => m.SupportDetailPageModule)
  },
  {
    path: 'panier',
    loadChildren: () => import('./panier/panier.module').then( m => m.PanierPageModule)
  },

  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }