import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import  FacebookIncon from '@material-ui/icons/Facebook';
import { MatDialog } from '@angular/material/dialog';
import { MensagemComponent } from '../mensagem/mensagem.component';
import { NgForm } from '@angular/forms';

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
  token: string|undefined;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: HotToastService,
    private dialog: MatDialog
  ) {this.token = undefined;}

  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    console.debug(`Token [${this.token}] generated`);
  }

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
