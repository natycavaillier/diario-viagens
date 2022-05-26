import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { doc, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@firebase/auth';
import { collection, setDoc } from '@firebase/firestore';
import { from, tap } from 'rxjs';

// Firebase Versão Modular
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth, // serviços do firebase authentication
    private db: Firestore, // serviços de banco firestore do firebase
    private router: Router // mudar de rota de forma imperativa
  ) {}

  uid?: string; // guarda o id único do usuário logado

  get logged() {
    // se é null, o usuário está deslogado
    return authState(this.auth).pipe(
      tap((user) => {
        // conforme o usuário loga/desloga
        // é atualizado o valor de id
        this.uid = user?.uid;
      })
    );
  }

  usuarios = collection(this.db, 'usuarios'); // referencia possível coleção

  signupEmail(email: string, password: string, nome: string, nick: string) {
    // Se comunica com o auth e cria um usuário a partir do email e senha
    // Pode ocorrer erros por isso é importante retornar o observable
    // para monitorar o ocorrido.
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      tap((creds) => {
        // cadastro deu certo
        const user = creds.user; // informações do usuário logado
        const userDoc = doc(this.usuarios, user.uid); // referencia um documento de usuário no firestore
        // Seta os dados do objeto dentro do documento com o mesmo id do usuário cadastrado
        // OBS: o setDoc remove os dados atuais do documento e seta os novos do objeto do parâmetro
        setDoc(userDoc, {
          uid: user.uid,
          email: email,
          nome: nome,
          nick: nick,
        });
      })
    );
  }

  loginEmail(email: string, password: string) {
    // Realiza o login com base no email/senha
    // O return é necessário para o componente de login
    // usar subscribe e "saber" quando o login falhou
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout(rota: '/login' | '/confirmar-email') {
    // Desloga o usuário e ao final
    // navega para uma rota determinada
    return from(this.auth.signOut()).pipe(
      tap(() => {
        this.router.navigate([rota]); // redireciona para a rota escolhida
      })
    );
  }

  /** TODO
   * - VERIFICAR EMAIL
   * - RECUPERAÇÃO DE SENHA
   * - LOGIN COM GOOGLE
   */
}
