
import { AuthService } from './../../../../core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { HotToastService } from '@ngneat/hot-toast';
import { concatMap } from 'rxjs/operators';
import { ImageUploadService } from 'src/app/core/services/image-upload/image-upload.service';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/core/services/users/users.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  user$ = this.authService.currentUser$;
  users$ = this.usersService.currentUserProfile$;

  profileForm = new FormGroup({
    uid: new FormControl(''),
    nome: new FormControl(''),
    nick: new FormControl(''),
  });

  constructor(
    private authService: AuthService,
    private imageUploadService: ImageUploadService,
    private toast: HotToastService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.usersService.currentUserProfile$.pipe(
      untilDestroyed(this)
      ).subscribe((user) => {
        this.profileForm.patchValue({ ...user });
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

  saveProfile() {
    const profileData = this.profileForm.value;
    this.usersService
      .updateUser(profileData)
      .pipe(
        this.toast.observe({
          loading: 'Carregando...',
          success: 'Perfil Atualizado',
          error: 'Um erro aconteceu',
        })
      )
      .subscribe();
  }
}
