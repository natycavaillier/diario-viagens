import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }

/**
 * Agrupar as funcionalidades de autenticação:
 * - Página de login
 * - Página de cadastro
 * - Página de redefinir senha
 */
