import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-modal-editar-pedido',
  templateUrl: './modal-editar-pedido.component.html',
  styleUrls: ['./modal-editar-pedido.component.scss']
})
export class ModalEditarPedidoComponent implements OnInit {
  pedido: Pedido
  detallesPedido: DetallePedido[] = []
  productos: Producto[] = [];
  clientes: Cliente[] = [];
  categorias: Categoria[] = [];
  detalleCarrito: DetallePedido[] = [];
  totalCarrito: number = 0;
  totalPedido: number = 0;
  idPedido: number = 0
  public formulario: FormGroup;
  nombreCliente: string
  cantidadProductos: { [idProducto: number]: number } = {};

  cantidadDetalle: { [idProducto: number]: number } = {};

  constructor(
    private productosService: ProductoService,
    private categoriasService: CategoriaService,
    private clientesService: ClienteService,
    private pedidoService: PedidoService,
    private detallePedidoService: DetallePedidoService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
  ) {

  }
  ngOnInit() {

    //Se inizializa el formulario
    this.formulario = this.formBuilder.group({
      idPedido: 0,
      estatus: 0,
      fecha: ['', Validators.required],
      total: 0,
      idCliente: [null, Validators.required]
    });

    this.route.queryParams.subscribe(queryParams => {
      this.idPedido = queryParams['idPedido'];
      this.nombreCliente = queryParams['nombre'];
    });

    this.clientesService.getAllClientes().subscribe(resp => {
      this.clientes = resp.lista
    })

    this.pedidoService.getPedidosDetalles(this.idPedido).subscribe(resp => {
      this.pedido = resp.object;
      this.detallesPedido = resp.lista;
      this.totalPedido = this.pedido.total;
      this.formulario = this.formBuilder.group({
        idPedido: this.formBuilder.control(this.pedido.idPedido),
        estatus: this.formBuilder.control(this.pedido.estatus),
        fecha: this.formBuilder.control(this.pedido.fecha),
        total: this.formBuilder.control(this.totalPedido),
        idCliente: this.formBuilder.control(this.pedido.idCliente)
      });

      this.formulario.get('idPedido')?.disable();
      this.formulario.get('total')?.disable();
    });

    this.categoriasService.getAllCategorias().subscribe(resp => {
      this.categorias = resp.lista
    })
    this.productosService.getAllProductos().subscribe(resp => {
      this.productos = resp.lista
    })
  }

  obtenerDetalles():void{
    this.pedidoService.getPedidosDetalles(this.idPedido).subscribe(resp=>{
      this.detallesPedido = resp.lista;
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
          idPedido: this.pedido
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

  borrarDetalle(detalle: DetallePedido) {
    Util.confirmMessage('¿Seguro que deseas eliminar a '.concat(detalle.idProducto.nombre).concat(" ?"), () => {
      this.detallePedidoService.deleteDetalle(detalle.idDetalle).subscribe(
        (resp) => {
          this.totalPedido -= detalle.suma;
          this.pedido = {
            idPedido: this.pedido.idPedido,
            estatus: this.pedido.estatus,
            fecha: this.pedido.fecha,
            total: this.totalPedido,
            idCliente: this.pedido.idCliente
          }
          this.pedidoService.updatePedido(this.pedido).subscribe(resp => {
          })
          Util.successMessage(resp.mensaje);
          setTimeout(() => {
            this.obtenerDetalles()
          }, 1000);
        },
        (error) => {
          console.error('Error al eliminar:', error);
          Util.errorMessage('Error al eliminar el detalle.');
        }
      );
    });
  }
  editarDetalle(cantidad: number) {

  }

  onSubmit() {
    let fechaSeleccionada: Date = this.formulario.get('fecha')?.value;
    let fechaFormateada: string = this.datePipe.transform(fechaSeleccionada, 'yyyy-MM-dd');
    let totalPedidoCompleto: number = this.totalCarrito + this.totalPedido;

    this.pedido = {
      idPedido: this.pedido.idPedido,
      estatus: this.pedido.estatus,
      fecha: fechaFormateada,
      total: totalPedidoCompleto,
      idCliente: this.pedido.idCliente
    }
    this.pedidoService.updatePedido(this.pedido).subscribe(resp => {
      let pedidoCreado: Pedido;
      pedidoCreado = resp.object;

      this.detalleCarrito.forEach(detalleCarrito => {

        const detalleExistente = this.detallesPedido.find(detallePedido =>
          detallePedido.idProducto.idProducto === detalleCarrito.idProducto.idProducto
        );
        if (detalleExistente) {
          detalleExistente.cantidad += detalleCarrito.cantidad;
          detalleExistente.suma += detalleCarrito.suma;
          this.detallePedidoService.updateDetalle(detalleExistente).subscribe(updateResp => {
          });
        } else {
          this.detallePedidoService.createDetalles([detalleCarrito]).subscribe(createResp => {
          });
        }
      });

      this.formulario.reset();
      Util.successMessage(resp.mensaje);
      setTimeout(() => {
        this.router.navigate(['/admin/pedidos']);
      }, 1000);
    });

  }

  productosdelPedido() {

  }
}
