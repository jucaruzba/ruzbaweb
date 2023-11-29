import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/data/Cliente';
import { User } from 'src/app/data/User';
import { ClienteService } from 'src/app/services/cliente.service';
import { UserService } from 'src/app/services/user.service';
import { Util } from 'src/app/util';

@Component({
  selector: 'app-modal-cliente',
  templateUrl: './modal-cliente.component.html',
  styleUrls: ['./modal-cliente.component.scss']
})
export class ModalClienteComponent  implements OnInit{
  usuarios:User[]=[];
  cliente:Cliente;
  public formulario: FormGroup;
  public modoEditar: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<ModalClienteComponent>,
    private usuarioService: UserService,
    private clientesServices:ClienteService,
    private formBuilder: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: Cliente
  ) { }


  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      idCliente: 0,
      nombre: ['', Validators.required],
      rfc: ['', Validators.required],
      direccion: ['', Validators.required],
      cfdi: ['', Validators.required],
      idUser: [null, Validators.required]
    });
    if (this.data) {
      this.modoEditar = true;
      this.formulario.patchValue({
        idCliente:this.data.idCliente,
        nombre:this.data.nombre,
        rfc:this.data.rfc,
        direccion:this.data.direccion,
        cfdi:this.data.cfdi,
        idUser:this.data.idUser
      });
      this.formulario.get('idCliente')?.disable();
    }
    this.usuarioService.getAllUsers().subscribe(resp => {
      this.usuarios = resp.lista
    })
  }


  public onSubmit(){
    if (this.modoEditar) {
      this.cliente = {

        idCliente:this.data.idCliente,
        nombre:this.formulario.get('nombre')?.value,
        rfc:this.formulario.get('rfc')?.value,
        direccion:this.formulario.get('direccion')?.value,
        cfdi:this.formulario.get('cfdi')?.value,
        idUser:this.formulario.get('idUser')?.value
      };
      this.clientesServices.updateCliente(this.cliente).subscribe(resp=>{
        this.dialogRef.close(resp);
        Util.successMessage(resp.mensaje);
        setTimeout(() => {
          this.router.navigate(['/admin/clientes']);
        }, 1000);
      })
    } else {
      this.cliente = {
        idCliente:0,
        nombre:this.formulario.get('nombre')?.value,
        rfc:this.formulario.get('rfc')?.value,
        direccion:this.formulario.get('direccion')?.value,
        cfdi:this.formulario.get('cfdi')?.value,
        idUser:this.formulario.get('idUser')?.value
      };
      this.clientesServices.createCliente(this.cliente).subscribe(resp => {
        Util.successMessage(resp.mensaje);
        this.dialogRef.close(resp);
        setTimeout(() => {
          this.router.navigate(['/admin/clientes']);
        }, 1000);
      });
    }
  }

}
