import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SiteLayoutComponent } from './shared/site-layout/site-layout.component';

const routes: Routes = [{
  path: '',
  component: SiteLayoutComponent,
  children: [
    { path: '', loadChildren: () => import('./home-page/home.module').then(m => m.HomeModule) }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
