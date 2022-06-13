import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first, Observable } from 'rxjs';
import { Diario } from 'src/app/core/models/diario';
import { DiariosService } from 'src/app/core/services/diarios/diarios.service';

@Component({
  selector: 'app-diario-detail',
  templateUrl: './diario-detail.component.html',
  styleUrls: ['./diario-detail.component.scss'],
})
export class DiarioDetailComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Diario,
    private diariosService: DiariosService
  ) { }

  diario$?: Observable<Diario>;
  diarioJaCurtido!: boolean;
  imagens: string[] = [];


  onClickLike(diario: Diario) {
    this.diariosService.likeDiario(diario, this.diarioJaCurtido)
    this.diarioJaCurtido = !this.diarioJaCurtido;
  }

  ngOnInit(): void {
    this.diario$ = this.diariosService.getDiarioById(
      this.data.id!
    );

    this.diario$.pipe(
      first()
    ).subscribe({
      next: (diario) => {
        this.diariosService.verificaIfAlreadyLiked(diario)
          .subscribe({
            next: (boolean) => this.diarioJaCurtido = boolean
          });

          diario.imagens.forEach((imagem) => {
            this.imagens.push(imagem);
          })
      }
    });
  }
}
