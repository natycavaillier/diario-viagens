import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiariosRoutingModule } from './diarios-routing.module';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DiarioAddComponent } from './components/diario-add/diario-add.component';
import { DiarioDetailComponent } from './components/diario-detail/diario-detail.component';
import { DiarioEditComponent } from './components/diario-edit/diario-edit.component';
import { DiarioListComponent } from './components/diario-list/diario-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PoliticaComponent } from './components/politica/politica.component';



@NgModule({
  declarations: [
    DiarioAddComponent,
    DiarioDetailComponent,
    DiarioEditComponent,
    DiarioListComponent,
    PoliticaComponent
  ],
  imports: [
    CommonModule,
    DiariosRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class DiariosModule { }
