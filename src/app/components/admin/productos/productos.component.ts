import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from 'src/app/data/Producto';
import { ProductoService } from 'src/app/services/producto.service';
import { ModalProductosComponent } from './modal-productos/modal-productos.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit{

  productos:Producto[]=[];

  constructor(
    public productosServices:ProductoService,
    public dialog:MatDialog
    ) { }
    ngOnInit(): void {
      this.productosServices.getAllProductos().subscribe(resp=>{
        this.productos=resp.lista
        console.log(this.productos)
      })
    }

    openDialogProducto(producto:Producto){
      const dialogRef = this.dialog.open(ModalProductosComponent,{
        data: producto
      });
    }
}
