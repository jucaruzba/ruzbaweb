import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Roles } from 'src/app/data/Roles';
import { RolesService } from 'src/app/services/roles.service';
import { Util } from 'src/app/util';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-rol',
  templateUrl: './modal-rol.component.html',
  styleUrls: ['./modal-rol.component.scss']
})
export class ModalRolComponent implements OnInit {

  rol: Roles;

  public formulario: FormGroup;
  public modoEditar: boolean = false;

  constructor(public dialogRef: MatDialogRef<ModalRolComponent>,
    private rolesService: RolesService,
    private formBuilder: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id: 0,
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
    if (this.data) {
      this.modoEditar = true;
      this.formulario.patchValue({
        id: this.data.idRol,
        nombre: this.data.nombre,
        descripcion: this.data.descripcion,
      });
    }
    console.log(this.data);
  }
  public onSubmit() {
    if (this.modoEditar) {
      this.rol = {
        idRol:this.data.idRol,
        nombre: this.formulario.get('nombre')?.value,
        descripcion: this.formulario.get('descripcion')?.value,
      };
      this.rolesService.updateRole(this.rol).subscribe(resp=>{
        this.dialogRef.close(resp);
        Util.successMessage(resp.mensaje);
        setTimeout(() => {
          this.router.navigate(['/admin/roles']);
        }, 1000);
      })
    } else {
      this.rol = {
        nombre: this.formulario.get('nombre')?.value,
        descripcion: this.formulario.get('descripcion')?.value,
      };
      this.rolesService.createRole(this.rol).subscribe(resp => {
        Util.successMessage(resp.mensaje);
        this.dialogRef.close(resp);
        setTimeout(() => {
          this.router.navigate(['/admin/roles']);
        }, 1000);
      });
    }
  }
}
