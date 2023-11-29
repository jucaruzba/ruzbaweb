// angular import
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pedido } from 'src/app/data/Pedido';
import { PedidoService } from 'src/app/services/pedido.service';
import CardComponent from 'src/app/demo/component/card/card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export default class DashboardComponent implements OnInit {
  pedidos: Pedido[] = [];
  fechaActual: Date;
  constructor(
    public pedidoService: PedidoService,
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

}
