// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import DashboardComponent from './components/admin/dashboard/dashboard.component';
import { RolesComponent } from './components/admin/roles/roles.component';
import { UsuariosComponent } from './components/admin/usuarios/usuarios.component';

import { CategoriasComponent } from './components/admin/categorias/categorias.component';
import { PedidosComponent } from './components/admin/pedidos/pedidos.component';
import { ClientesComponent } from './components/admin/clientes/clientes.component';
import { ProductosComponent } from './components/admin/productos/productos.component';
import { CrearPedidoComponent } from './components/admin/pedidos/crear-pedido/crear-pedido.component';
import { ModalEditarPedidoComponent } from './components/admin/pedidos/modal-editar-pedido/modal-editar-pedido.component';
import { MostrarComponent } from './components/admin/pedidos/mostrar/mostrar.component';
import { HomeComponent } from './components/admin/home/home.component';
import { LoginComponent } from './components/admin/login/login.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate:[AuthGuard],
    children:[
      { path: '', redirectTo: 'home', 
      pathMatch: 'full'},
      { path: 'home', component: HomeComponent },
      { path: 'roles', component: RolesComponent },
      {path:'usuarios',component:UsuariosComponent},
      {path:'categorias', component:CategoriasComponent},
      {path:'pedidos', component:PedidosComponent},
      {path:'crearPedido', component:CrearPedidoComponent},
      {path:'editarPedido', component:ModalEditarPedidoComponent},
      {path:'clientes', component:ClientesComponent},
      {path:'productos', component:ProductosComponent}
    ]
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'user',
    component:UserComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
