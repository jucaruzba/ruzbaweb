import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/data/Pedido';
import { PedidoService } from 'src/app/services/pedido.service';
import { Util } from 'src/app/util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  pedidos: Pedido[] = [];
  fechaActual: Date;
  constructor(
    public pedidoService: PedidoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fechaActual = new Date();
    this.obtenerPedidosPorFecha();
  }
  obtenerPedidosPorFecha(): void {
    const fechaFormateada = this.fechaActual.toISOString().slice(0, 10);
    this.pedidoService.getPedidosFecha(fechaFormateada).subscribe(resp => {
      this.pedidos=resp.lista
    });
  }
  actualizarEstatus(pedido:Pedido){
    if (pedido.estatus === 0) {
      pedido.estatus = 1;
      console.log(pedido.estatus)

      Util.confirmMessage('Quieres cambiar el pedido a "En Preparacion"?', () => {
        this.pedidoService.updatePedido(pedido).subscribe(
          (resp) => {
            Util.successMessage(resp.mensaje);
            setTimeout(() => {
              this.obtenerPedidosPorFecha();
            }, 1000);
          },
          (error) => {
            console.error('Error al actualizar:', error);
            Util.errorMessage('Error al actualizar el pedido.');
          }
        );
      });

    } else if (pedido.estatus === 1) {
      pedido.estatus = 2;

      Util.confirmMessage('Quieres cambiar el pedido a "En Ruta"?', () => {
        this.pedidoService.updatePedido(pedido).subscribe(
          (resp) => {
            Util.successMessage(resp.mensaje);
            setTimeout(() => {
              this.obtenerPedidosPorFecha();
            }, 1000);
          },
          (error) => {
            console.error('Error al actualizar:', error);
            Util.errorMessage('Error al actualizar el pedido.');
          }
        );
      });

    } else if (pedido.estatus === 2) {
      pedido.estatus = 3;
      Util.confirmMessage('Quieres cambiar el pedido a "Entregado?', () => {
        this.pedidoService.updatePedido(pedido).subscribe(
          (resp) => {
            Util.successMessage(resp.mensaje);
            setTimeout(() => {
              this.obtenerPedidosPorFecha();
            }, 1000);
          },
          (error) => {
            console.error('Error al actualizar:', error);
            Util.errorMessage('Error al actualizar el pedido.');
          }
        );
      });
    } else if (pedido.estatus === 3) {
      Util.warningMessage('El pedido ya fue entregado, no se puede actualizar el estatus')
    }
  }
}
