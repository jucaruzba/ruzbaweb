import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { User } from '../data/User';
import { UserAuth } from '../data/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged: any = false;
  constructor(public afAuth: AngularFireAuth,
    private storageService: StorageService) {
    afAuth.authState.subscribe(user => (this.isLogged = user));
   }

   async onLogin(user: UserAuth) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(user.email,user.password);
      return result;
    } catch (error) {
      console.log("Error en login", error);
      return null;
    }
  }
  async onLogout() {
    try {
      await this.afAuth.signOut();
      console.log("Usuario ha cerrado sesión correctamente");
      this.storageService.removeItem('Token')
      this.storageService.removeItem('idUser')
    } catch (error) {
      console.log("Error en logout", error);
    }
  }
}
