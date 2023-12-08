import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Categoria } from 'src/app/data/Categoria';
import { Producto } from 'src/app/data/Producto';
import { Unidad } from 'src/app/data/Unidad';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UnidadService } from 'src/app/services/unidad.service';
import { Util } from 'src/app/util';
import { Buffer } from 'buffer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-productos',
  templateUrl: './modal-productos.component.html',
  styleUrls: ['./modal-productos.component.scss']
})
export class ModalProductosComponent implements OnInit {
  producto: Producto;
  categorias: Categoria[] = [];
  unidades: Unidad[] = [];
  imagenBase64 = ''
  public formulario: FormGroup;
  public modoEditar: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<ModalProductosComponent>,
    private productosService: ProductoService,
    private categoriasService: CategoriaService,
    private unidadesService: UnidadService,
    private formBuilder: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: Producto
  ) { }


  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      idProducto: 0,
      nombre: ['', Validators.required],
      precio: [0, Validators.required],
      descripcion: ['', Validators.required],
      imagen: [null],
      idCategoria: [null, Validators.required],
      idUnidad: [null, Validators.required],
      codigoSat:['', Validators.required]
    });
    if (this.data) {
      this.modoEditar = true;
      this.formulario.patchValue({
        idProducto: this.data.idProducto,
        nombre: this.data.nombre,
        precio: this.data.precio,
        imagen: this.data.imagen,
        descripcion: this.data.descripcion,
        idCategoria: this.data.idCategoria,
        idUnidad: this.data.idUnidad,
        codigoSat:this.data.codigoSat
      });
      this.formulario.get('imagen')?.disable();
      this.formulario.get('idCategoria')?.disable();
      this.formulario.get('idUnidad')?.disable();
    }

    this.categoriasService.getAllCategorias().subscribe(resp => {
      this.categorias = resp.lista
    })
    this.unidadesService.getAllUnidades().subscribe(resp => {
      this.unidades = resp.lista
    })
  }

  public onSubmit() {
    let productoData: any;

    if (this.modoEditar) {
      productoData = {
        idProducto: this.data.idProducto,
        nombre: this.formulario.get('nombre')?.value,
        descripcion: this.formulario.get('descripcion')?.value,
        precio: this.formulario.get('precio')?.value,
        imagen: this.data.imagen,
        codigoSat:this.formulario.get('codigoSat')?.value,
        idCategoria: this.formulario.get('idCategoria')?.value,
        idUnidad: this.formulario.get('idUnidad')?.value,
      };
    } else {
      productoData = {
        nombre: this.formulario.get('nombre')?.value,
        precio: this.formulario.get('precio')?.value,
        imagen: this.imagenBase64,
        codigoSat:this.formulario.get('codigoSat')?.value,
        descripcion: this.formulario.get('descripcion')?.value,
        idCategoria: this.formulario.get('idCategoria')?.value,
        idUnidad: this.formulario.get('idUnidad')?.value,
      };
    }
    if (this.modoEditar) {
      this.productosService.updateProducto(productoData).subscribe(resp => {
        this.dialogRef.close(resp);
        Util.successMessage(resp.mensaje);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
    } else {
      this.productosService.createProducto(productoData).subscribe(resp => {
        this.dialogRef.close(resp);
        Util.successMessage(resp.mensaje);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
    }
  }


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        this.imagenBase64 = reader.result as string;
        console.log(this.imagenBase64);
      };

      reader.readAsDataURL(file);
    }
  }

  eliminarProducto(){
    Util.confirmMessage('¿Seguro que deseas eliminar a '.concat(this.data.nombre).concat(" ?"), () => {
      this.productosService.deleteProducto(this.data.idProducto).subscribe(
        (resp) => {
          Util.successMessage(resp.mensaje);
          setTimeout(() => {
            this.router.navigate(['/admin/productos']);
          }, 1000);
        },
        (error) => {
          console.error('Error al eliminar:', error);
          Util.errorMessage('Error al eliminar el producto.');
        }
      );
    });
  }

}
