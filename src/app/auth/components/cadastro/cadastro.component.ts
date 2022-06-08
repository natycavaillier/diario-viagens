import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ConfereSenhaComponent } from '../confere-senha/confere-senha.component';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  signupForm1 = this.fb.group({
    nome: ['', [Validators.required]],
  });

  signupForm2 = this.fb.group({
    nick: ['', [Validators.required]],
  });

  signupForm3 = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  signupForm4 = this.fb.group({
    senha: ['', [Validators.required, Validators.minLength(8)]],
  });

  signupForm5 = this.fb.group({
    confirma_senha: [''],
  });

  signupForm6 = this.fb.group({
    imagemprofile: [''],
  });

  isLinear = true;

  confereSenha() {
    if (
      this.signupForm4.get('senha')!.value !==
      this.signupForm5.get('confirma_senha')!.value
    ) {
      return false;
    } else {
      return true;
    }
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: HotToastService,
    public dialog: MatDialog
  ) {}

  onSubmit() {
    if (this.confereSenha()) {
      var { email } = this.signupForm3.value;
      var { senha } = this.signupForm4.value;
      var { nick } = this.signupForm2.value;
      var { nome } = this.signupForm1.value;
      var { imagemprofile } = this.signupForm6.value;
    } else {
      this.dialog.open(ConfereSenhaComponent);
      
    }
    
    this.authService
      .signupEmail(email, senha, nome, nick, imagemprofile)
      .pipe(
        this.toast.observe({
          success: 'Usuário criado com sucesso',
          error: 'Um erro ocorreu',
          loading: 'Criando usuário...',
        })
      )
      .subscribe();
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
      .subscribe();
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
      .subscribe();
  }

  ngOnInit(): void { }
}
