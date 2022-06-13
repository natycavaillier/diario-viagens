import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { first, merge, of } from 'rxjs';
import { Diario } from 'src/app/core/models/diario';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UploadService } from 'src/app/core/services/upload/upload.service';

@Component({
  selector: 'app-diario-add',
  templateUrl: './diario-add.component.html',
  styleUrls: ['./diario-add.component.scss'],
})
export class DiarioAddComponent implements OnInit {

  constructor(
    private ref: MatDialogRef<DiarioAddComponent>,
    private uploadService: UploadService,
    private authService: AuthService,
    private toast: HotToastService
  ) { }

  diario: Diario = {} as Diario;
  imagens: File[] = [];
  links: string[] = [];
  upload: string = "Fazer Upload Imagens"
  icone: string = "upload"

  setImage(ev: any) {
    for (var imagem of ev.target.files) {
      this.imagens.push(imagem);
    }

    merge(...this.imagens.map((imagem) => of(imagem)))
      .subscribe({
        next: (imagemFile) => {
          this.uploadService.upload(imagemFile, `diarios/${this.authService.uid}/`)
            .pipe(
              first(),
              this.toast.observe({
                success: 'Upload realizado',
                error: 'Operação cancelada',
                loading: 'Realizando upload da foto...',
              })
            )
            .subscribe({
              next: (url) => {
                if (url) {
                  this.links.push(url);
                }        
              },
              complete: () => {
                this.upload = "Upload Realizado",
                this.icone = "check"                       
              }
    
            })
        }
      });
  }


  onSubmit() {
    this.ref.close({ diario: this.diario, links: this.links });
  }

  ngOnInit(): void { }
}
