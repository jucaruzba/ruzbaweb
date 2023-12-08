import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from 'src/app/data/Producto';
import { ProductoService } from 'src/app/services/producto.service';
import { ModalProductosComponent } from './modal-productos/modal-productos.component';
import { Categoria } from 'src/app/data/Categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit{

  productos:Producto[]=[];
  categorias:Categoria[]=[];
  terminoBusqueda: string = '';
  productosFiltrados: Producto[] = [];

  selectedCategoria: Categoria | undefined;

  constructor(
    public productosServices:ProductoService,
    public categoriasService:CategoriaService,
    public dialog:MatDialog
    ) { }
    ngOnInit(): void {
      this.productosServices.getAllProductos().subscribe(resp=>{
        this.productos=resp.lista
        console.log(this.productos);
      })
      this.categoriasService.getAllCategorias().subscribe(resp=>{
        this.categorias=resp.lista
      })
    }

    openDialogProducto(producto:Producto){
      const dialogRef = this.dialog.open(ModalProductosComponent,{
        data: producto
      });
    }

    productosPorCategoria(): void {
      if (this.selectedCategoria) {
        console.log(this.selectedCategoria);
      }
      this.productosServices.getProductosCategoria(this.selectedCategoria.idCategoria).subscribe(resp=>{
        this.productos=null;
        this.productos=resp.lista
      })
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
