import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/data/User';
import { UserAuth } from 'src/app/data/login';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { Util } from 'src/app/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: UserAuth
  userAutenticado: User;
  token = '';
  public formulario: FormGroup;
  constructor(private router: Router,
    private authSvc: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private storageService: StorageService
  ) {

  }
  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  navigateToAdmin() {
    this.router.navigate(['/admin']);
  }
  async onLogin(event: Event) {
    event.preventDefault();
    try {
      this.user = {
        email: this.formulario.get('email')?.value,
        password: this.formulario.get('password')?.value,
      }

      const user = await this.authSvc.onLogin(this.user);

      if (user) {
        const uid = user.user?.uid;

        if (uid) {
          const response = await this.userService.getUserBySession(uid).toPromise();
          this.userAutenticado = response.object;

          if (this.userAutenticado && this.userAutenticado.rol && this.userAutenticado.rol.nombre === 'Administrador') {
            const idToken = await user.user?.getIdToken();
            this.token = idToken;
            this.storageService.setItem('Token', this.token);

            this.storageService.setItem('idUser', uid);
            this.router.navigate(['/admin']);
            this.formulario.reset();
          } else {
            Util.errorMessage('No puede entrar al sistema un usuario que no es administrador');
          }

        } else {
          Util.errorMessage('No existe el usuario');
        }

      } else {
        Util.errorMessage('No existe el usuario');
      }

    } catch (error) {
      console.error('Error en la autenticación:', error);
      Util.errorMessage('Error en la autenticación. Por favor, inténtelo de nuevo.');
    }
  }


}
