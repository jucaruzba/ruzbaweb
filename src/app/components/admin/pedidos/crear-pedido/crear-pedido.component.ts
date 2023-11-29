import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Console } from 'console';
import { Categoria } from 'src/app/data/Categoria';
import { Cliente } from 'src/app/data/Cliente';
import { DetallePedido } from 'src/app/data/DetallePedido';
import { Pedido } from 'src/app/data/Pedido';
import { Producto } from 'src/app/data/Producto';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { DetallePedidoService } from 'src/app/services/detalle-pedido.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { ProductoService } from 'src/app/services/producto.service';
import { Util } from 'src/app/util';

@Component({
  selector: 'app-crear-pedido',
  templateUrl: './crear-pedido.component.html',
  styleUrls: ['./crear-pedido.component.scss']
})
export class CrearPedidoComponent implements OnInit {
  detallesPedido: DetallePedido[] = []
  productos: Producto[] = [];
  clientes: Cliente[] = [];
  pedido: Pedido;
  categorias: Categoria[] = [];
  detalleCarrito: DetallePedido[] = [];
  totalCarrito: number = 0;
  public formulario: FormGroup;

  cantidadProductos: { [idProducto: number]: number } = {};

  constructor(
    private productosService: ProductoService,
    private categoriasService: CategoriaService,
    private clientesService: ClienteService,
    private pedidoService: PedidoService,
    private detallePedidoService: DetallePedidoService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      idPedido: 0,
      estatus: 0,
      fecha: ['', Validators.required],
      total: 0,
      idCliente: [null, Validators.required]
    });

    this.formulario.get('total')?.disable();
    this.clientesService.getAllClientes().subscribe(resp => {
      this.clientes = resp.lista
    })
    this.categoriasService.getAllCategorias().subscribe(resp => {
      this.categorias = resp.lista
    })
    this.productosService.getAllProductos().subscribe(resp => {
      this.productos = resp.lista
    })

  }

  obtenerProductosPorCategoria(categoria: Categoria): Producto[] {
    return this.productos.filter(producto => producto.idCategoria.idCategoria === categoria.idCategoria);
  }

  agregarCarrito(cantidadProducto: number, producto: Producto) {
    if (this.detalleCarrito.length === 0) {
      this.totalCarrito = 0;
    }

    if (cantidadProducto !== null && !isNaN(cantidadProducto)) {
      const detalleExistente = this.detalleCarrito.find(detalle => detalle.idProducto.idProducto === producto.idProducto);
      if (detalleExistente) {
        detalleExistente.cantidad += cantidadProducto;
        detalleExistente.suma += cantidadProducto * producto.precio;
      } else {
        const nuevoDetalle: DetallePedido = {
          cantidad: cantidadProducto,
          suma: cantidadProducto * producto.precio,
          idProducto: producto,
        };
        this.detalleCarrito.push(nuevoDetalle);
      }
      this.totalCarrito = this.detalleCarrito.reduce((total, detalle) => total + detalle.suma, 0);
      this.cantidadProductos[producto.idProducto] = undefined;
      console.log(this.totalCarrito);
    } else {
      Util.errorMessage('Debes poner una cantidad válida');
    }
  }

  borrarProducto(index: number) {
    if (index >= 0 && index < this.detalleCarrito.length) {
      this.totalCarrito -= this.detalleCarrito[index].suma;
      this.detalleCarrito.splice(index, 1);
      console.log(this.totalCarrito)
    } else {
      console.error('No valido');
    }
  }
  onSubmit() {
    let fechaSeleccionada: Date = this.formulario.get('fecha')?.value;
    let fechaFormateada: string = this.datePipe.transform(fechaSeleccionada, 'yyyy-MM-dd');
    console.log(fechaFormateada);
    this.pedido = {
      idPedido: 0,
      estatus: 0,
      fecha: fechaFormateada,
      total: this.totalCarrito,
      idCliente: this.formulario.get('idCliente')?.value,
    }
    if (this.detalleCarrito.length > 0) {
      this.pedidoService.createPedido(this.pedido).subscribe(resp => {
        let pedidoCreado: Pedido;
        pedidoCreado = resp.object
        this.detalleCarrito.forEach(detalle => {
          detalle.idPedido = pedidoCreado
        });
        this.detallePedidoService.createDetalles(this.detalleCarrito).subscribe(resp => { })
        this.formulario.reset()
        Util.successMessage(resp.mensaje);
        setTimeout(() => {
          this.router.navigate(['/admin/pedidos']);
        }, 1000);
      })
    } else {
      Util.errorMessage('Debes agregar almenos 1 producto')
    }
  }
}
