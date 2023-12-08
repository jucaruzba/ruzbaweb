import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.scss']
})
export class CrearFacturaComponent implements OnInit{

  detallesFactura:DetalleFactura[]=[];
  productos: Producto[] = [];
  clientes: Cliente[] = [];
  factura:Factura;

  detalleCarrito:DetalleFactura[]=[];
  totalCarrito:number=0;
  public formulario: FormGroup;

  terminoBusqueda: string = '';
  productosFiltrados: Producto[] = [];

  cantidadProductos: { [idProducto: number]: number } = {};


  constructor(
    private productosService: ProductoService,
    private clientesService: ClienteService,
    private facturasService: FacturasService,
    private detalleFacturaService: DetalleFacturasService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      idFactura: 0,
      fecha: ['', Validators.required],
      total: 0,
      idCliente: [null, Validators.required]
    });
    this.formulario.get('total')?.disable();

    this.clientesService.getAllClientes().subscribe(resp => {
      this.clientes = resp.lista
    })

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
    this.factura = {
      idFactura: 0,
      fecha: fechaFormateada,
      total: this.totalCarrito,
      idCliente: this.formulario.get('idCliente')?.value,
    }

    
    if (this.detalleCarrito.length > 0) {
      this.facturasService.createFactura(this.factura).subscribe(resp => {
        let facturaCreada: Factura;
        facturaCreada = resp.object
        this.detalleCarrito.forEach(detalle => {
          detalle.idFactura = facturaCreada
        });
        this.detalleFacturaService.createDetalles(this.detalleCarrito).subscribe(resp => { })
        this.formulario.reset()
        Util.successMessage(resp.mensaje);
        setTimeout(() => {
          this.router.navigate(['/admin/facturas']);
        }, 1000);
      })
    } else {
      Util.errorMessage('Debes agregar almenos 1 producto')
    }
    
   console.log(this.detalleCarrito);
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
