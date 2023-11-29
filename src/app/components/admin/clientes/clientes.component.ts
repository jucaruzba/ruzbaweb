import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Cliente } from 'src/app/data/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { Util } from 'src/app/util';
import { ModalClienteComponent } from './modal-cliente/modal-cliente.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent  implements OnInit{
  clientes:Cliente[]=[];

  constructor(
    public clienteService:ClienteService,
    public dialog:MatDialog
  ){

  }
  ngOnInit(): void {
    this.clienteService.getAllClientes().subscribe(resp=>{
      this.clientes=resp.lista
    })
  }
  obtenerClientes(){
    this.clienteService.getAllClientes().subscribe(resp=>{
      this.clientes=resp.lista
    })
  }

  openDialogProducto(cliente:Cliente){
    const dialogRef = this.dialog.open(ModalClienteComponent,{
      data: cliente
    });
  }

  eliminarUsuario(cliente:Cliente){
    Util.confirmMessage('¿Seguro que deseas eliminar a '.concat(cliente.nombre).concat(" ?"), () => {
      this.clienteService.deleteCliente(cliente.idCliente).subscribe(
        (resp) => {
          Util.successMessage(resp.mensaje);
          setTimeout(() => {
            this.obtenerClientes()
          }, 1000);
        },
        (error) => {
          console.error('Error al eliminar:', error);
          Util.errorMessage('Error al eliminar cliente.');
        }
      );
    });
  }
}
