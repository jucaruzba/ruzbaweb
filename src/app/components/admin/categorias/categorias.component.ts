import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Categoria } from 'src/app/data/Categoria';
import { Unidad } from 'src/app/data/Unidad';
import { CategoriaService } from 'src/app/services/categoria.service';
import { UnidadService } from 'src/app/services/unidad.service';
import { ModalCategoriaComponent } from './modal-categoria/modal-categoria.component';
import { ModalUnidadComponent } from './modal-unidad/modal-unidad.component';
import { Util } from 'src/app/util';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent  implements OnInit{
  categorias: Categoria[]=[];
  unidades: Unidad[]=[];
  constructor(
    public categoriaService:CategoriaService,
    public unidadService:UnidadService,
    public dialogCategoria:MatDialog,
    public dialogUnidad:MatDialog
    ) { }


    ngOnInit(): void {
      this.categoriaService.getAllCategorias().subscribe(resp=>{
        this.categorias=resp.lista;
      })
      this.unidadService.getAllUnidades().subscribe(resp=>{
        this.unidades=resp.lista
      })
    }
    obtenerCategorias(){
      this.categoriaService.getAllCategorias().subscribe(resp=>{
        this.categorias=resp.lista;
      })
    }
    obtenerUnidades(){
      this.unidadService.getAllUnidades().subscribe(resp=>{
        this.unidades=resp.lista
      })
    }
    openDialogCategoria(data:Categoria){
      const dialogRef = this.dialogCategoria.open(ModalCategoriaComponent,{
        data: data
      });
    }
    openDialogUnidad(data:Unidad){
      const dialogRef = this.dialogUnidad.open(ModalUnidadComponent,{
        data: data
      });
    }

    eliminarCategoria(categoria:Categoria){
      Util.confirmMessage('¿Seguro que deseas eliminar a '.concat(categoria.nombre).concat(" ?"), () => {
        this.categoriaService.deleteCategoria(categoria.idCategoria).subscribe(
          (resp) => {
            Util.successMessage(resp.mensaje);
            setTimeout(() => {
              this.obtenerCategorias()
            }, 1000);
          },
          (error) => {
            console.error('Error al eliminar:', error);
            Util.errorMessage('Error al eliminar la categoria.');
          }
        );
      });
    }
    eliminarUnidad(unidad:Unidad){
      Util.confirmMessage('¿Seguro que deseas eliminar a '.concat(unidad.presentacion).concat(" ?"), () => {
        this.unidadService.deleteUnidad(unidad.idUnidad).subscribe(
          (resp) => {
            Util.successMessage(resp.mensaje);
            setTimeout(() => {
              this.obtenerUnidades()
            }, 1000);
          },
          (error) => {
            console.error('Error al eliminar:', error);
            Util.errorMessage('Error al eliminar la unidad.');
          }
        );
      });
    }

}
