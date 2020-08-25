import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { NotInternetComponent } from './views/not-internet/not-internet.component';
import { NotFoundComponent } from './views/not-found/not-found.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'internet', component: NotInternetComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
