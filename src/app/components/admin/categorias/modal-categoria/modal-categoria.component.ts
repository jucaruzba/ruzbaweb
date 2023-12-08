import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/data/Categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Util } from 'src/app/util';

@Component({
  selector: 'app-modal-categoria',
  templateUrl: './modal-categoria.component.html',
  styleUrls: ['./modal-categoria.component.scss']
})
export class ModalCategoriaComponent  implements OnInit{
  categoria: Categoria;


  public formulario: FormGroup;
  public modoEditar: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<ModalCategoriaComponent>,
    private categoriaService:CategoriaService,
    private formBuilder: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: Categoria) { }
  
    ngOnInit(): void {
      this.formulario = this.formBuilder.group({
        id: 0,
        nombre: ['', Validators.required]
      });
      if (this.data) {
        this.modoEditar = true;
        this.formulario.patchValue({
          id: this.data.idCategoria,
          nombre: this.data.nombre,
        });
      }
    }

    public onSubmit(){
      if (this.modoEditar) {
        this.categoria = {
          idCategoria:this.data.idCategoria,
          nombre: this.formulario.get('nombre')?.value
        };
        this.categoriaService.updateCategoria(this.categoria).subscribe(resp=>{
          this.dialogRef.close(resp);
          Util.successMessage(resp.mensaje);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
      } else {
        this.categoria = {
          nombre: this.formulario.get('nombre')?.value
        };
        this.categoriaService.createCategoria(this.categoria).subscribe(resp => {
          Util.successMessage(resp.mensaje);
          this.dialogRef.close(resp);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
      }
    }

}
