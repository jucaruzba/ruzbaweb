import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/data/Cliente';
import { Factura } from 'src/app/data/Facturas';
import { ClienteService } from 'src/app/services/cliente.service';
import { FacturasService } from 'src/app/services/facturas.service';
import { MostrarFacturaComponent } from './mostrar-factura/mostrar-factura.component';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss']
})
export class FacturasComponent implements OnInit {

  facturas: Factura[] = [];
  clientes: Cliente[] = [];
  selectedCliente: Cliente | undefined;

  constructor(
    public facturasService:FacturasService,
    public clienteService:ClienteService,
    public dialog:MatDialog,
    private router: Router
    ) { }

    ngOnInit(): void {
      this.facturasService.getAllFacturas().subscribe(resp=>{
        this.facturas=resp.lista
        console.log(this.facturas)
      })
      this.clienteService.getAllClientes().subscribe(resp=>{
        this.clientes=resp.lista
      })
    }

    nuevaFactura(){
      this.router.navigate(['/admin/crearFactura']);
    }

    facturasPorCliente():void{
      if (this.selectedCliente) {
        console.log(this.selectedCliente);
      }
  
      this.facturasService.getFacturasCliente(this.selectedCliente.idCliente).subscribe(resp=>{
        this.facturas=null;
        this.facturas=resp.lista
      })
    }

    openDialogMostrar(factura:Factura){
      const dialogRef = this.dialog.open(MostrarFacturaComponent,{
        data: factura
      });
    }
}
