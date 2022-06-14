import { Injectable } from '@angular/core';
import {
  collectionData,
  docData,
  Firestore,
  orderBy,
  where,
} from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  updateDoc,
} from '@firebase/firestore';
import { first, from, Observable, switchMap } from 'rxjs';
import { Diario, DiarioConverter } from '../../models/diario';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DiariosService {
  constructor(
    private db: Firestore,
    private authService: AuthService
  ) {}


  diarios = collection(this.db, 'diarios').withConverter(DiarioConverter);

  getTodosDiarios(): Observable<Diario[]> {

    return collectionData(query(this.diarios, orderBy('createdAt', 'desc')), { idField: 'id' });
  }

  atualizaFoto(): Observable<Diario[]> {
    return this.authService.logged.pipe(
      first(),
      switchMap((user) => {

        return collectionData(
          query(this.diarios, where('usuarioId', '==', user?.photoURL)),
          { idField: 'id' }
        );
      })

    );
  }

  atualizaNome(): Observable<Diario[]> {
    return this.authService.logged.pipe(
      first(),
      switchMap((user) => {

        return collectionData(
          query(this.diarios, where('usuarioId', '==', user?.displayName)),
          { idField: 'id' }
        );
      })

    );
  }

  getDiariosUsuario(): Observable<Diario[]> {
    return this.authService.logged.pipe(

      first(),
      switchMap((user) => {

        return collectionData(
          query(this.diarios, where('usuarioId', '==', user?.uid)),
          { idField: 'id' }
        );
      })
    );
  }

  getDiarioById(id: string): Observable<Diario> {
    const diarioDoc = doc(this.diarios, id);
    return docData(diarioDoc, { idField: 'id' });
  }

  addDiario(diario: Diario, links: string[]) {

    return this.authService.userData.pipe(
      switchMap((user) => {
        diario.createdAt = new Date();
        // diario.imagens = links ?? ['assets/img/placeholder.png'];
        diario.imagens = links;
        diario.usuarioId = this.authService.uid;
        diario.usuarioNick = user['nick'];
        diario.usuarioName = user['nome'];
        diario.imagemprofile = user['imagemprofile'];
        diario.usersLiked = [];

        return from(addDoc(this.diarios, diario));
      })
    );
  }

  editDiario(diario: Diario, links: string[]) {
    const arrayVazio: string[] = []
    console.log(links)
    const diarioDoc = doc(this.diarios, diario.id);
    return from(
      updateDoc(diarioDoc, { ...diario, imagens: links ?? arrayVazio })
    );
  }

  deleteDiario(diario: Diario) {

    const diarioDoc = doc(this.diarios, diario.id);

    return from(deleteDoc(diarioDoc));
  }

  verificaIfAlreadyLiked(diario: Diario): Observable<boolean> {
    return new Observable(emissor => {
      if (diario.usersLiked.find(user => user == this.authService.uid)) {
        emissor.next(true);
      } else {
        emissor.next(false)
      }
    })
  }

  likeDiario(diario: Diario, diarioJaCurtido: boolean) {
    const diarioDoc = doc(this.diarios, diario.id);
    const allUsersLiked: string[] = diario.usersLiked;


    if (diarioJaCurtido) {
      diario.usersLiked.splice(diario.usersLiked.indexOf(this.authService.uid!), 1);
      return from(
        updateDoc(diarioDoc, { ...diario, usersLiked: allUsersLiked }));

    } else {
      diario.usersLiked.push(this.authService.uid!);
      return from(
        updateDoc(diarioDoc, { ...diario, usersLiked: allUsersLiked }));
    }
  }

}

