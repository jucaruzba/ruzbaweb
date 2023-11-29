import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Unidad } from 'src/app/data/Unidad';
import { UnidadService } from 'src/app/services/unidad.service';
import { Util } from 'src/app/util';

@Component({
  selector: 'app-modal-unidad',
  templateUrl: './modal-unidad.component.html',
  styleUrls: ['./modal-unidad.component.scss']
})
export class ModalUnidadComponent implements OnInit{

  unidad:Unidad;
  public formulario: FormGroup;
  public modoEditar: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ModalUnidadComponent>,
    private unidadService: UnidadService,
    private formBuilder: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: Unidad
    ) { }
    ngOnInit(): void {
      this.formulario = this.formBuilder.group({
        id: 0,
        presentacion: ['', Validators.required],
        abreviatura: ['', Validators.required]
      });
      if (this.data) {
        this.modoEditar = true;
        this.formulario.patchValue({
          id: this.data.idUnidad,
          presentacion:this.data.presentacion,
          abreviatura:this.data.abreviatura
        });
      }
    }

    public onSubmit(){
      if (this.modoEditar) {
        this.unidad = {
          idUnidad:this.data.idUnidad,
          presentacion:this.formulario.get('presentacion')?.value,
          abreviatura:this.formulario.get('abreviatura')?.value
        };
        this.unidadService.updateUnidad(this.unidad).subscribe(resp=>{
          this.dialogRef.close(resp);
          Util.successMessage(resp.mensaje);
          setTimeout(() => {
            this.router.navigate(['/admin/categorias']);
          }, 1000);
        })
      } else {
        this.unidad = {
          presentacion:this.formulario.get('presentacion')?.value,
          abreviatura:this.formulario.get('abreviatura')?.value
        };
        this.unidadService.createUnidad(this.unidad).subscribe(resp => {
          Util.successMessage(resp.mensaje);
          this.dialogRef.close(resp);
          setTimeout(() => {
            this.router.navigate(['/admin/categorias']);
          }, 1000);
        });
      }
    }
}
