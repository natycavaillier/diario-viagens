import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { first, merge, of } from 'rxjs';
import { Diario } from 'src/app/core/models/diario';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UploadService } from 'src/app/core/services/upload/upload.service';

@Component({
  selector: 'app-diario-edit',
  templateUrl: './diario-edit.component.html',
  styleUrls: ['./diario-edit.component.scss'],
})
export class DiarioEditComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Diario, 
    private ref: MatDialogRef<DiarioEditComponent>,
    private uploadService: UploadService,
    private authService: AuthService,
    private toast: HotToastService
  ) {}

  diario: Diario = {} as Diario;
  imagens: File[] = [];
  links: string[] = [];

  setImage(ev: any) {
    for(var imagem of ev.target.files){
      this.imagens.push(imagem)
    }

      merge(...this.imagens.map((imagem) => of(imagem)))
      .subscribe({
        next: (imagemFile) => {
          this.uploadService.upload(imagemFile, `diarios/${this.authService.uid}/`)
            .pipe(
              first(),
              this.toast.observe({
                success: 'Upload das fotos realizado',
                error: 'Operação cancelada',
                loading: 'Fazendo upload da foto...',
              })
            )
            .subscribe({
              next: (url) => {
                if (url) {
                  this.links.push(url);
                }
              }
            })
        }
      });
    
  }

  onSubmit() {
    this.ref.close({ diario: this.diario, links: this.links });
  }

  ngOnInit(): void {
    this.diario = this.data;
  }
}
