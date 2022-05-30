import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { DiariosService } from 'src/app/core/services/diarios/diarios.service';
import { DiarioAddComponent } from '../diario-add/diario-add.component';

@Component({
  selector: 'app-diario-list',
  templateUrl: './diario-list.component.html',
  styleUrls: ['./diario-list.component.scss'],
})
export class DiarioListComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private diariosService: DiariosService,
    private toast: HotToastService
  ) {} // Abrir dialogs baseado em componentes existentes

  onClickAdd() {
    // DiarioAddComponent será mostrado dentro do dialog
    const ref = this.dialog.open(DiarioAddComponent, { maxWidth: '512px' });
    // Acontece logo após o fechamento do dialog
    ref.afterClosed().subscribe({
      next: (result) => {
        // Evento que ocorre ao fechar dialog
        if (result) {
          this.diariosService
            .addDiario(result.diario, result.imagem)
            .pipe(
              this.toast.observe({
                loading: 'Adicionando...',
                error: 'Ocorreu um erro',
                success: 'Diário adicionado',
              })
            )
            .subscribe();
        }
      },
    });
  }

  ngOnInit(): void {}
}
