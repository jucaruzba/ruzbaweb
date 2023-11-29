import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pedido } from 'src/app/data/Pedido';
import { PedidoService } from 'src/app/services/pedido.service';
import { UserService } from 'src/app/services/user.service';

import { ModalEditarPedidoComponent } from './modal-editar-pedido/modal-editar-pedido.component';
import { Router } from '@angular/router';
import { MostrarComponent } from './mostrar/mostrar.component';
import { Cliente } from 'src/app/data/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit{

pedidos:Pedido[]=[];
clientes:Cliente[]=[];
selectedCliente: Cliente | undefined;
constructor(
  public pedidoService:PedidoService,
  public clienteService:ClienteService,
  public dialog:MatDialog,
  private router: Router
  ) { }


ngOnInit(): void {
  this.pedidoService.getAllPedidos().subscribe(resp=>{
    this.pedidos=resp.lista
  })
  this.clienteService.getAllClientes().subscribe(resp=>{
    this.clientes=resp.lista
  })
}
  mostrarPedido(pedido:Pedido){
    const dialogRef = this.dialog.open(ModalEditarPedidoComponent,{
      data: pedido
    });
  }
  nuevoPedido(){
    this.router.navigate(['/admin/crearPedido']);
  }

  openDialogMostrar(pedido:Pedido){
    const dialogRef = this.dialog.open(MostrarComponent,{
      data: pedido
    });
  }

  pedidosPorCliente(): void {
    if (this.selectedCliente) {
      console.log(this.selectedCliente);
    }

    this.pedidoService.getPedidosCliente(this.selectedCliente.idCliente).subscribe(resp=>{
      this.pedidos=null;
      this.pedidos=resp.lista
    })
  }
}
