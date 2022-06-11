import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MensagemSaidaComponent } from 'src/app/auth/components/mensagem-saida/mensagem-saida.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private mensagem: MatDialog
    
    ) {}

  logged$?: Observable<any>;

  

  logout() {
    this.authService.logout('/login').subscribe({
      next: () => this.mensagem.open(MensagemSaidaComponent)

    }
      
    );
  }

 
  cor: string = '#1877f2';

  onClickPrimary(){
    this.cor = '#1877f2';  
  }

  onClickAccent(){
    this.cor = '#e91e63';
  }

  ngOnInit(): void {
    this.logged$ = this.authService.logged;
   
  }
}
