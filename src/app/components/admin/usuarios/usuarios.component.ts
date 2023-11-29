import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/data/User';
import { UserService } from '../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalUsuarioComponent } from './modal-usuario/modal-usuario.component';
import { Util } from 'src/app/util';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit{

  usuarios:User[]=[];
  constructor(
    public userService:UserService,
    public dialog:MatDialog
    ) { }
  
    ngOnInit(): void {
      this.userService.getAllUsers().subscribe(resp=>{
        this.usuarios=resp.lista
      })
    }
    optenerRoles(){
      this.userService.getAllUsers().subscribe(resp=>{
        this.usuarios=resp.lista
      })
    }
    openDialogProducto(usuario:User){
      const dialogRef = this.dialog.open(ModalUsuarioComponent,{
        data: usuario
      });
    }

    eliminarUsuario(usuario:User){
      Util.confirmMessage('¿Seguro que deseas eliminar a '.concat(usuario.nombre).concat(" ?"), () => {
        this.userService.deleteUser(usuario.idUser).subscribe(
          (resp) => {
            this.optenerRoles()
            Util.successMessage(resp.mensaje);
          },
          (error) => {
            console.error('Error al eliminar:', error);
            Util.errorMessage('Error al eliminar la categoria.');
          }
        );
      });
    }
}
