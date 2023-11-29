import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataPdfDTO } from 'src/app/data/DataPdfDTO';
import { DetallePedido } from 'src/app/data/DetallePedido';
import { Pedido } from 'src/app/data/Pedido';
import { DetallePedidoService } from 'src/app/services/detalle-pedido.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { saveAs } from 'file-saver';
import { Util } from 'src/app/util';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.scss']
})
export class MostrarComponent implements OnInit {
  pedido: Pedido
  detallesPedido: DetallePedido[] = []
  observaciones:string='NA';
  constructor(public dialogRef: MatDialogRef<MostrarComponent>,
    private pedidoService: PedidoService,
    private detalleService: DetallePedidoService,
    @Inject(MAT_DIALOG_DATA) public data: Pedido,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pedidoService.getPedidosDetalles(this.data.idPedido).subscribe(resp => {
      this.pedido = resp.object
      this.detallesPedido = resp.lista
      console.log(this.pedido)
      console.log(this.detallesPedido)
    })
  }

  editarPedido() {
    const datos = {
      idPedido: this.data.idPedido,
      nombre: this.data.idCliente.nombre
    };
    this.router.navigate(['/admin/editarPedido'], { queryParams: datos });
    this.dialogRef.close();
  }
  pdfNota() {
    let dataPdf: DataPdfDTO;
    dataPdf = {
      idPedido: this.pedido.idPedido,
      iva: 0,
      observaciones:this.observaciones
    };

    this.pedidoService.getPdf(dataPdf).subscribe((pdfData: any) => {
      const blob = new Blob([pdfData], { type: 'application/pdf' });
      const fileName = `nota${this.pedido.idCliente.nombre}_${this.pedido.idPedido}.pdf`;
      saveAs(blob, fileName);
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
