import { Injectable } from '@angular/core';
import { collectionData, Firestore, limit, orderBy } from '@angular/fire/firestore';
import { collection, query } from '@firebase/firestore';
import { map, Observable } from 'rxjs';
import { Diario, DiarioConverter } from '../../models/diario';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  diarios = collection(this.db, 'diarios').withConverter(DiarioConverter);

  constructor(private db: Firestore) {}

  getPostsCount(): Observable<number> {
    return collectionData(this.diarios).pipe(map((diarios) => diarios.length));
  }

  getLastPosts(): Observable<Diario[]> {
    const q = query(this.diarios,
      orderBy('createdAt', 'desc'),
      limit(5)
    );

    return collectionData(q);
  }
}
