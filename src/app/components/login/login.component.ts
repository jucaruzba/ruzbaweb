// angular import
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/data/User';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent implements OnInit {

  user: User = new User();
  userAutenticado: User;

  public formulario: FormGroup;
  constructor(private router: Router,
    private authSvc: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
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

  async onLogin() {
    this.user = {
      email: this.formulario.get('email')?.value,
      password: this.formulario.get('password')?.value,
    }
    console.log(this.user);

    const user = await this.authSvc.onLogin(this.user);
    if (user) {
      const uid = user.user?.uid;
      this.router.navigate(['/cliente']);

      if (uid) {
        this.userService.getUserBySession(uid).subscribe(resp => {
          this.userAutenticado = resp.object
        })
      }

    } else {
      console.log('No existe', user)
    }
  }
}


/*
 if (uid) {
   this.userAuth.getUserAuthenticacion(uid).subscribe(resp=>{
     this.userAutenticado=resp.lista[0]
     console.log(this.userAutenticado)
     if(this.userAutenticado.idRol==='Administrador'){
       user.user?.getIdToken().then((idToken) => {
         this.token = idToken;
         this.storageService.setItem('Token', this.token)
       });
       this.storageService.setItem('IdUser',this.userAutenticado.idUser);
       this.router.navigate(['/admin']);
       setTimeout(() => {
         location.reload();
       }, 100); 
     }
     else if(this.userAutenticado.idRol==='Empleado'){
       this.router.navigate(['/empleado']);
     }else if(this.userAutenticado.idRol==='Cliente'){
       this.router.navigate(['/cliente']);
     }
   })
 } else {
   console.log('No existen un perfil para el usuario');
 }
 */