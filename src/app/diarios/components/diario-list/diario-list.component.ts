import { ImageUploadService } from 'src/app/core/services/image-upload/image-upload.service';
import { PerfilComponent } from './../../../auth/components/perfil/perfil/perfil.component';
import { ProfileUser } from './../../../core/models/user-profile';
import { Auth, User } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { DeleteDialogComponent } from 'src/app/auth/components/delete-dialog/delete-dialog.component';
import { Diario } from 'src/app/core/models/diario';
import { DiariosService } from 'src/app/core/services/diarios/diarios.service';
import { DiarioAddComponent } from '../diario-add/diario-add.component';
import { DiarioEditComponent } from '../diario-edit/diario-edit.component';
import { UsersService } from 'src/app/core/services/users/users.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-diario-list',
  templateUrl: './diario-list.component.html',
  styleUrls: ['./diario-list.component.scss'],
})
export class DiarioListComponent implements OnInit {
  allDiarios$?: Observable<Diario[]>;
  meusDiarios$?: Observable<Diario[]>;
  atualizaFoto$?: Observable<Diario[]>;
  atualizaNome$?: Observable<Diario[]>;
  user$ = this.authService.currentUser$;
  users$ = this.usersService.currentUserProfile$;

  diario: Diario = {} as Diario;
  imagem?: File;
  dialogRef!: MatDialogRef<DeleteDialogComponent>;

  constructor(
    private dialog: MatDialog,
    private diariosService: DiariosService,
    private toast: HotToastService,
    private authService: AuthService,
    private usersService: UsersService,
    private imageUploadService: ImageUploadService
  ) {}

  setImage(ev: any) {
    this.imagem = ev.target.files[0];
  }

  

  onClickAdd() {
    const ref = this.dialog.open(DiarioAddComponent, { maxWidth: '512px' });
    ref.afterClosed().subscribe({
      next: (result) => {
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

  uploadImage(event: any, user: User) {
    this.imageUploadService
      .uploadImage(event.target.files[0], `images/profile/${user.uid}`)
      .pipe(
        this.toast.observe({
          loading: 'Imagem carregando...',
          success: 'Imagem Atualizada',
          error: 'Erro no carregamento',
        }),
        concatMap((photoURL) =>
          this.authService.updateProfileData({ photoURL })
        )
      )
      .subscribe();
  }


  onClickEdit(diario: Diario) {
    const ref = this.dialog.open(DiarioEditComponent, {
      maxWidth: '512px',
      data: { ...diario },
    });
    ref.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.diariosService
            .editDiario(result.diario, result.imagem)
            .pipe(
              this.toast.observe({
                loading: 'Atualizando...',
                error: 'Ocorreu um erro',
                success: 'Diário atualizado',
              })
            )
            .subscribe();
        }
      },
    });
  }

  onClickDelete(diario: Diario) {
    this.dialogRef = this.dialog.open(DeleteDialogComponent);
    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.diariosService
        .deleteDiario(diario)
        .pipe(this.toast.observe({ success: 'Diário apagado!' }))
        .subscribe();
      }
        //  this.dialogRef = null
    });
  }

  ngOnInit(): void {
    this.allDiarios$ = this.diariosService.getTodosDiarios();
    this.meusDiarios$ = this.diariosService.getDiariosUsuario();
    this.atualizaFoto$ = this.diariosService.atualizaFoto();
    this.atualizaNome$ = this.diariosService.atualizaNome();

  }
}
