import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Roles } from 'src/app/data/Roles';
import { RolesService } from '../../../services/roles.service';
import { ModalRolComponent } from './modal-rol/modal-rol.component';
import { Util } from 'src/app/util';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent  implements OnInit{
  roles: Roles[] = [];

  constructor(public rolesService:RolesService,
    public dialog:MatDialog
    ) { }

  ngOnInit(): void {
    this.rolesService.getAllRoles().subscribe(resp=>{
      this.roles=resp.lista;
    })
  }
obtenerRoles(){
  this.rolesService.getAllRoles().subscribe(resp=>{
    this.roles=resp.lista;
  })
}

  eliminar(rol:Roles){
    Util.confirmMessage('¿Seguro que deseas eliminar a '.concat(rol.nombre).concat(" ?"), () => {
      this.rolesService.deleteRole(rol.idRol).subscribe(
        (resp) => {
          Util.successMessage(resp.mensaje);
          setTimeout(() => {
            this.obtenerRoles()
          }, 1000);
        },
        (error) => {
          console.error('Error al eliminar:', error);
          Util.errorMessage('Error al eliminar el rol.');
        }
      );
    });
  }
  public openDialog(data:any){
    const dialogRef = this.dialog.open(ModalRolComponent,{
      data: data // Pasa la variable data al diálogo
    });
  }
}

/**
  constructor(
  ) { }

  ngOnInit(): void {
  }
 */