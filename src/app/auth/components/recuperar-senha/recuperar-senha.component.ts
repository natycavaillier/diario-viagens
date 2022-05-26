import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.scss'],
})
export class RecuperarSenhaComponent implements OnInit {
  email: string = '';

  constructor(
    private authService: AuthService,
    private toast: HotToastService
  ) {}

  onSubmit() {
    this.authService
      .recoverPassword(this.email)
      .pipe(
        this.toast.observe({
          success: 'Email enviado',
          error: 'Um erro ocorreu',
          loading: 'Carregando...',
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}
}
