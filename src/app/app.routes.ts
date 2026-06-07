import { Routes } from '@angular/router';

import { hasRoleGuard } from './common/guards/has-role.guard';



export const routes: Routes = [
    {
        path: '',
      loadComponent: ()=> import('./page/lobby/lobby.component')
        .then(m => m.LobbyComponent),
        title: 'lobby'
    },
    {
        path: 'lobby',
          loadComponent: ()=> import('./page/lobby/lobby.component')
        .then(m => m.LobbyComponent),
        title: 'Lobby'
    },
    // {
    //     path: 'login',
    //     loadComponent: ()=> import('./components/loging/loging.component')
    //     .then(m => m.LogingComponent),
    //     title: 'login'
    // },
    {
        path: 'login',
        loadComponent: () => import('./page/LoginN/login-n.component')
            .then(m => m.LoginNComponent),
        title: 'Iniciar Sesión',
    },
    {
        path: 'newsale',
        canActivate:[hasRoleGuard("Admin")],
        loadComponent: ()=> import('./page/newsale/newsale.component')
      .then(m => m.NewsaleComponent),
        title: 'Venta'
    },
    {
        path: 'service',
        canActivate:[hasRoleGuard("Admin")],
        loadComponent: ()=> import('./page/catalogoservice/catalogoservice.component')
      .then(m => m.CatalogoserviceComponent),
        title: 'Servicios'
    },
    {
        path: 'service/:id',
        canActivate:[hasRoleGuard("Admin")],
         loadComponent: () => import('./components/serviceedit/serviceedit.component')
            .then(m => m.ServiceeditComponent),
        title: 'neweervicio'
    },
    // {
    //     path: 'test',
    //     component: ServiceComponent,
    //     title: 'test'
    // },
    {
        path: 'details/:id',
          loadComponent: () => import('./page/workdetail/workdetail.component')
            .then(m => m.WorkdetailComponent),
        title: 'detalle del vehiculo'
    },
    {
        path: 'newventa',
         loadComponent: () => import('./page/newventa/newventa.component')
            .then(m => m.NewventaComponent),
        title: 'Venta nueva'
    },
    {
        path: 'paySale',
            loadComponent: () => import('./page/pay-sale/pay-sale.component')
            .then(m => m.PaySaleComponent),
        title: 'Pagar'
    },
    {
        path: 'sumarysale/:id',
         loadComponent: () => import('./components/cresumen-sale/cresumen-sale.component')
            .then(m => m.CresumenSaleComponent),
        title: 'Detalle Venta'
    },
    {
        path: 'msale',
        loadComponent: () => import('./page/monitorin/p-msale/p-msale.component')
            .then(m => m.PMsaleComponent),
        title: 'Monitoring'
    },
    {
    path: 'report',
    canActivate:[hasRoleGuard("Admin")],
    loadComponent: () => import('./page/monitorin/Report/car-washer/car-washer.component')
            .then(m => m.CarWasherComponent)
    },


    
    // {
    //     path: 'loginn',
    //     loadComponent: () => import('./page/LoginN/login-n.component')
    //         .then(m => m.LoginNComponent),
    //     title: 'Iniciar Sesión',
    // },
    // {
    //     path: '*', loadComponent: () => import('./components/loging/loging.component')
    //         .then(m => m.LogingComponent),
    // },
];
