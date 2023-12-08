import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DetalleFactura } from 'src/app/data/DetalleFactura';
import { Factura } from 'src/app/data/Facturas';
import { FacturasService } from '../../../../services/facturas.service';
import { DetalleFacturasService } from 'src/app/services/detalle-facturas.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-mostrar-factura',
  templateUrl: './mostrar-factura.component.html',
  styleUrls: ['./mostrar-factura.component.scss']
})
export class MostrarFacturaComponent {

  factura:Factura;
  detallesFactura: DetalleFactura[]=[];

  constructor(public dialogRef: MatDialogRef<MostrarFacturaComponent>,
    private facturasService: FacturasService,
    private detalleFacturaService: DetalleFacturasService,
    @Inject(MAT_DIALOG_DATA) public data: Factura,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.facturasService.getFacturaById(this.data.idFactura).subscribe(resp => {
      this.factura = resp.object
      console.log(this.factura)
    })

    this.detalleFacturaService.getDetallesPedido(this.data.idFactura).subscribe(resp=>{
      this.detallesFactura=resp.lista
      console.log(this.detallesFactura)
    })
  }


  editarFactura() {
    const datos = {
      idFactura: this.data.idFactura,
    };
    this.router.navigate(['/admin/editarFactura'], { queryParams: datos });
    this.dialogRef.close();
  }

  pdfNota() {
    this.facturasService.getPdf(this.data.idFactura).subscribe((pdfData: any) => {
      const blob = new Blob([pdfData], { type: 'application/pdf' });
      const fileName = `Factura_${this.factura.idCliente.nombre}.pdf`;
      saveAs(blob, fileName);
    });
  }
}
