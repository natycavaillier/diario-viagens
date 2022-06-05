import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { first, Observable, switchMap, tap } from 'rxjs';
import { Diario } from 'src/app/core/models/diario';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { DiariosService } from 'src/app/core/services/diarios/diarios.service';

@Component({
  selector: 'app-diario-detail',
  templateUrl: './diario-detail.component.html',
  styleUrls: ['./diario-detail.component.scss'],
})
export class DiarioDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute, // guarda informações sobre a rota atual
    private diariosService: DiariosService,
    private authService: AuthService
  ) { }

  diario$?: Observable<Diario>;
  diarioJaCurtido!: boolean;


  onClickLike(diario: Diario) {
    this.diariosService.likeDiario(diario, this.diarioJaCurtido)
    this.diarioJaCurtido = !this.diarioJaCurtido;
  }

  ngOnInit(): void {
    this.diario$ = this.diariosService.getDiarioById(
      this.route.snapshot.params['id']
    );

    this.diario$.pipe(
      first()
    ).subscribe({
      next: (diario) => {
        this.diariosService.verificaIfAlreadyLiked(diario)
          .subscribe({
            next: (boolean) => this.diarioJaCurtido = boolean
          });
      }
    });
  }
}
