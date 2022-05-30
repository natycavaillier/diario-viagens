import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiarioDetailComponent } from './components/diario-detail/diario-detail.component';
import { DiarioListComponent } from './components/diario-list/diario-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'diarios',
    pathMatch: 'full',
  },
  { path: 'diarios', component: DiarioListComponent },
  // Essa rota é dinâmica
  // /diarios/dasdas2133
  { path: 'diarios/:id', component: DiarioDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiariosRoutingModule {}
