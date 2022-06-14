import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiarioDetailComponent } from './components/diario-detail/diario-detail.component';
import { DiarioListComponent } from './components/diario-list/diario-list.component';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';
import { PoliticaComponent } from './components/politica/politica.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'diarios',
    pathMatch: 'full',
  },
  {
    path: 'diarios',
    component: DiarioListComponent,
    ...canActivate(redirectUnauthorizedToLogin), 
  },

  {
    path: 'diarios/:id',
    component: DiarioDetailComponent,
    ...canActivate(redirectUnauthorizedToLogin), 
  },

  { path: 'politica-privacidade', component: PoliticaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiariosRoutingModule {}
