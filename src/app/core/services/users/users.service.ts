import { AuthService } from 'src/app/core/services/auth/auth.service';
import {  from, Observable, of, switchMap } from 'rxjs';
import { doc, docData, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { ProfileUser } from '../../models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  get currentUserProfile$(): Observable<ProfileUser | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'usuarios', user?.uid);
        return docData(ref) as Observable<ProfileUser>;
      })
    );
  }

  constructor(private firestore: Firestore, private authService: AuthService) { }

  addUser(user: ProfileUser): Observable<any>{
    const ref = doc(this.firestore, 'usuarios', user?.uid)
    return from(setDoc(ref, user));
  }

  updateUser(user: ProfileUser): Observable<any>{
    const ref = doc(this.firestore, 'usuarios', user?.uid)
    return from(updateDoc(ref, {...user}));
  }
}
