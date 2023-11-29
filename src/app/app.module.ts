// angular import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { DatePipe } from '@angular/common';
// project import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './theme/shared/shared.module';
import { AdminComponent } from './components/admin/admin.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { NavigationComponent } from './components/admin/navigation/navigation.component';
import { NavBarComponent } from './components/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from './components/admin/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from './components/admin/nav-bar/nav-right/nav-right.component';
import { NavContentComponent } from './components/admin/navigation/nav-content/nav-content.component';
import { NavCollapseComponent } from './components/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavGroupComponent } from './components/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavItemComponent } from './components/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavigationItem } from './components/admin/navigation/navigation';
import { UserComponent } from './components/user/user.component';
import { RolesComponent } from './components/admin/roles/roles.component';
import { UsuariosComponent } from './components/admin/usuarios/usuarios.component';
import { ClientesComponent } from './components/admin/clientes/clientes.component';
import { CategoriasComponent } from './components/admin/categorias/categorias.component';
import { UnidadesComponent } from './components/admin/unidades/unidades.component';
import { ProductosComponent } from './components/admin/productos/productos.component';
import { PedidosComponent } from './components/admin/pedidos/pedidos.component';
import { ModalRolComponent } from './components/admin/roles/modal-rol/modal-rol.component';
import { ModalCategoriaComponent } from './components/admin/categorias/modal-categoria/modal-categoria.component';
import { ModalUnidadComponent } from './components/admin/categorias/modal-unidad/modal-unidad.component';
import { ModalProductosComponent } from './components/admin/productos/modal-productos/modal-productos.component';
import { ModalUsuarioComponent } from './components/admin/usuarios/modal-usuario/modal-usuario.component';
import { ModalClienteComponent } from './components/admin/clientes/modal-cliente/modal-cliente.component';

import { ModalEditarPedidoComponent } from './components/admin/pedidos/modal-editar-pedido/modal-editar-pedido.component';
import { CrearPedidoComponent } from './components/admin/pedidos/crear-pedido/crear-pedido.component';
import { MostrarComponent } from './components/admin/pedidos/mostrar/mostrar.component';
import { HomeComponent } from './components/admin/home/home.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment'
import { LoginComponent } from './components/admin/login/login.component';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    GuestComponent,
    NavigationComponent,
    NavBarComponent,
    NavLeftComponent,
    NavRightComponent,
    NavContentComponent,
    NavCollapseComponent,
    NavGroupComponent,
    NavItemComponent,
    UserComponent,
    RolesComponent,
    UsuariosComponent,
    ClientesComponent,
    CategoriasComponent,
    UnidadesComponent,
    ProductosComponent,
    PedidosComponent,
    ModalRolComponent,
    ModalCategoriaComponent,
    ModalUnidadComponent,
    ModalProductosComponent,
    ModalUsuarioComponent,
    ModalClienteComponent,
    ModalEditarPedidoComponent,
    CrearPedidoComponent,
    MostrarComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule, BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    MatTreeModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatTabsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [NavigationItem,DatePipe,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
