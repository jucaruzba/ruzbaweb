import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  icon?: string;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}
const NavigationItems = [
  {
    id: 'dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'HOME',
        type: 'item',
        classes: 'nav-item',
        url: '/admin/home',
        breadcrumbs: false
      },
      {
        id: 'default',
        title: 'PEDIDOS',
        type: 'item',
        classes: 'nav-item',
        url: '/admin/pedidos',
        breadcrumbs: false
      },
      {
        id: 'default',
        title: 'FACTURAS',
        type: 'item',
        classes: 'nav-item',
        url: '/admin/facturas',
        breadcrumbs: false
      },

      {
        id: 'productos',
        title: 'PRODUCTOS',
        type: 'item',
        classes: 'nav-item',
        url: '/admin/productos',
        breadcrumbs: false
      }
      ,
      {
        id: 'usuarios',
        title: 'USUARIOS',
        type: 'item',
        classes: 'nav-item',
        url: '/admin/usuarios',
        breadcrumbs: false
      },
      {
        id: 'clientes',
        title: 'CLIENTES',
        type: 'item',
        classes: 'nav-item',
        url: '/admin/clientes',
        breadcrumbs: false
      },
      {
        id: 'roles',
        title: 'ROLES',
        type: 'item',
        classes: 'nav-item',
        url: '/admin/roles',
        breadcrumbs: false
      },
      {
        id: 'categorias',
        title: 'CATEGORIAS/UNIDADES',
        type: 'item',
        classes: 'nav-item',
        url: '/admin/categorias',
        breadcrumbs: false
      },


    ]
  }
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
