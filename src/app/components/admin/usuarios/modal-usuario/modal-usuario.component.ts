import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Roles } from 'src/app/data/Roles';
import { User } from 'src/app/data/User';
import { RolesService } from 'src/app/services/roles.service';
import { UserService } from 'src/app/services/user.service';
import { Util } from 'src/app/util';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.scss']
})
export class ModalUsuarioComponent {

  usuario: User;
  roles: Roles[] = [];
  imagenBase64 = ''
  public formulario: FormGroup;
  public modoEditar: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<ModalUsuarioComponent>,
    private usuarioService: UserService,
    private rolesService: RolesService,
    private formBuilder: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) { }


  ngOnInit(): void {  2
    this.formulario = this.formBuilder.group({
      idUser: 0,
      idAutheticacion: [''],
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      imagen: [null],
      rol: [null, Validators.required]
    });
    if (this.data) {
      this.modoEditar = true;
      this.formulario.patchValue({
        idUser:this.data.idUser,
        idAutheticacion:this.data.idAutheticacion,
        nombre:this.data.nombre,
        email:this.data.email,
        password:this.data.password,
        imagen:this.data.imagen,
        rol:this.data.rol
      });
      this.formulario.get('email')?.disable();
      this.formulario.get('password')?.disable();
      this.formulario.get('imagen')?.disable();
      this.formulario.get('rol')?.disable();
    }

    this.rolesService.getAllRoles().subscribe(resp => {
      this.roles = resp.lista
    })
  }

  public onSubmit(){
    if (this.modoEditar) {
      this.usuario = {
        idUser:this.data.idUser,
        idAutheticacion:this.data.idAutheticacion,
        nombre:this.formulario.get('nombre')?.value,
        email:this.data.email,
        password:this.data.password,
        imagen:this.data.imagen,
        rol:this.data.rol,
      };
      this.usuarioService.updateUser(this.usuario).subscribe(resp=>{
        this.dialogRef.close(resp);
        Util.successMessage(resp.mensaje);
        setTimeout(() => {
          this.router.navigate(['/admin/usuarios']);
        }, 1000);
      })
    } else {
      this.usuario = {
        idUser:0,
        idAutheticacion:'',
        nombre:this.formulario.get('nombre')?.value,
        email:this.formulario.get('email')?.value,
        password:this.formulario.get('password')?.value,
        imagen:this.imagenBase64,
        rol:this.formulario.get('rol')?.value,
      };
      this.usuarioService.createUser(this.usuario).subscribe(resp => {
        Util.successMessage(resp.mensaje);
        this.dialogRef.close(resp);
        setTimeout(() => {
          this.router.navigate(['/admin/usuarios']);
        }, 1000);
      });
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        this.imagenBase64 = reader.result as string;
        console.log(this.imagenBase64);
      };

      reader.readAsDataURL(file);
    }
  }
}
