import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/data/Cliente';
import { DetalleFactura } from 'src/app/data/DetalleFactura';
import { Factura } from 'src/app/data/Facturas';
import { Producto } from 'src/app/data/Producto';
import { ClienteService } from 'src/app/services/cliente.service';
import { DetalleFacturasService } from 'src/app/services/detalle-facturas.service';
import { FacturasService } from 'src/app/services/facturas.service';
import { ProductoService } from 'src/app/services/producto.service';
import { Util } from 'src/app/util';

@Component({
  selector: 'app-editar-factura',
  templateUrl: './editar-factura.component.html',
  styleUrls: ['./editar-factura.component.scss']
})
export class EditarFacturaComponent {


  factura:Factura;
  detallesFactura:DetalleFactura[]=[]
  productos:Producto[]=[]
  clientes:Cliente[]=[]
  detalleCarrito: DetalleFactura[] = [];
  totalCarrito: number = 0;
  totalFactura: number = 0;

  idFactura: number = 0
  public formulario: FormGroup;
  cantidadProductos: { [idProducto: number]: number } = {};


  terminoBusqueda: string = '';
  productosFiltrados: Producto[] = [];


  cantidadDetalle: { [idProducto: number]: number } = {};

  constructor(
    private productosService: ProductoService,
    private clientesService: ClienteService,
    private facturaService: FacturasService,
    private detallesFacturaService: DetalleFacturasService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
  ) {}


  ngOnInit() {

    //Se inizializa el formulario
    this.formulario = this.formBuilder.group({
      idFactura: 0,
      fecha: ['', Validators.required],
      total: 0,
      idCliente: [null, Validators.required]
    });

    this.route.queryParams.subscribe(queryParams => {
      this.idFactura = queryParams['idFactura'];
    });

    this.clientesService.getAllClientes().subscribe(resp => {
      this.clientes = resp.lista
    })

    this.facturaService.getFacturaDetalles(this.idFactura).subscribe(resp => {
      this.factura = resp.object;
      this.detallesFactura = resp.lista;
      this.totalFactura = this.factura.total;

      this.formulario = this.formBuilder.group({
        idFactura: this.formBuilder.control(this.factura.idFactura),
        fecha: this.formBuilder.control(this.factura.fecha),
        total: this.formBuilder.control(this.totalFactura),
        idCliente: this.formBuilder.control(this.factura.idCliente)
      });

      this.formulario.get('idFactura')?.disable();
      this.formulario.get('total')?.disable();
    });
    this.productosService.getAllProductos().subscribe(resp => {
      this.productos = resp.lista
    })
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
        const nuevoDetalle: DetalleFactura = {
          cantidad: cantidadProducto,
          suma: cantidadProducto * producto.precio,
          idProducto: producto,
          idFactura: this.factura
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
  borrarDetalle(detalle: DetalleFactura) {
    Util.confirmMessage('¿Seguro que deseas eliminar a '.concat(detalle.idProducto.nombre).concat(" ?"), () => {
      this.detallesFacturaService.deleteDetalle(detalle.idDetalle).subscribe(
        (resp) => {
          this.totalFactura -= detalle.suma;
          this.factura = {
            idFactura: this.factura.idFactura,
            fecha: this.factura.fecha,
            total: this.totalFactura,
            idCliente: this.factura.idCliente
          }
          this.facturaService.updateFactura(this.factura).subscribe(resp => {
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

  obtenerDetalles():void{
    this.facturaService.getFacturaDetalles(this.idFactura).subscribe(resp=>{
      this.detallesFactura = resp.lista;
    })
  }

  onSubmit() {
    let fechaSeleccionada: Date = this.formulario.get('fecha')?.value;
    let fechaFormateada: string = this.datePipe.transform(fechaSeleccionada, 'yyyy-MM-dd');
    let totalPedidoCompleto: number = this.totalCarrito + this.totalFactura;

    this.factura = {
      idFactura: this.factura.idFactura,
      fecha: fechaFormateada,
      total: totalPedidoCompleto,
      idCliente: this.factura.idCliente
    }
    this.facturaService.updateFactura(this.factura).subscribe(resp => {
      let facturaCreado: Factura;
      facturaCreado = resp.object;

      this.detalleCarrito.forEach(detalleCarrito => {

        const detalleExistente = this.detallesFactura.find(detallePedido =>
          detallePedido.idProducto.idProducto === detalleCarrito.idProducto.idProducto
        );
        if (detalleExistente) {
          detalleExistente.cantidad += detalleCarrito.cantidad;
          detalleExistente.suma += detalleCarrito.suma;
          this.detallesFacturaService.updateDetalle(detalleExistente).subscribe(updateResp => {
          });
        } else {
          this.detallesFacturaService.createDetalles([detalleCarrito]).subscribe(createResp => {
          });
        }
      });

      this.formulario.reset();
      Util.successMessage(resp.mensaje);
      setTimeout(() => {
        this.router.navigate(['/admin/facturas']);
      }, 1000);
    });

  }

  actualizarProductosFiltrados() {
    if (!this.terminoBusqueda) {
      this.productosFiltrados = this.productos;
    } else {
      const terminoLowerCase = this.terminoBusqueda.toLowerCase();
      this.productosFiltrados = this.productos.filter(item => item.nombre.toLowerCase().includes(terminoLowerCase));
    }
  }

}
