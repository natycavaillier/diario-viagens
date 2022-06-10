import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import  FacebookIncon from '@material-ui/icons/Facebook';
import { MatDialog } from '@angular/material/dialog';
import { MensagemComponent } from '../mensagem/mensagem.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(8)]],
  });

  hide = true;
 

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: HotToastService,
    private dialog: MatDialog
  ) {}

  onSubmit(): void {
    const { email, senha } = this.loginForm.value;
    this.authService
      .loginEmail(email, senha)
      .pipe(
        this.toast.observe({
          success: 'Login efetuado',
          error: 'Um erro ocorreu',
          loading: 'Fazendo login...',
        })
      )

      .subscribe({
        next: () => this.dialog.open(MensagemComponent)      
      });
  }

  onLoginGoogle() {
    this.authService
      .loginGoogle()
      .pipe(
        this.toast.observe({
          success: 'Login efetuado',
          error: 'Operação cancelada',
          loading: 'Fazendo login...',
        })
      )
      .subscribe({
        next: () => this.dialog.open(MensagemComponent)
      });
  }

  onLoginFacebook() {
    this.authService
      .loginFacebook()
      .pipe(
        this.toast.observe({
          success: 'Login efetuado',
          error: 'Operação cancelada',
          loading: 'Fazendo login...',
        })
      )
        .subscribe({
          next: () => this.dialog.open(MensagemComponent)
        });
  }

  ngOnInit(): void {}
}
