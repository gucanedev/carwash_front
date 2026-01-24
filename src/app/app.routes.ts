import { Routes } from '@angular/router';
import { LobbyComponent } from './page/lobby/lobby.component';
import { LogingComponent } from './components/loging/loging.component';
import { NewsaleComponent } from './page/newsale/newsale.component';
import { CatalogoserviceComponent } from './page/catalogoservice/catalogoservice.component';
import { ServiceeditComponent } from './components/serviceedit/serviceedit.component';
import { ServiceComponent } from './page/service/service.component';
import { WorkdetailComponent } from './page/workdetail/workdetail.component';
import { NewventaComponent } from './page/newventa/newventa.component';
import { PaySaleComponent } from './page/pay-sale/pay-sale.component';
import { CresumenSaleComponent } from './components/cresumen-sale/cresumen-sale.component';
import { PMsaleComponent } from './page/monitorin/p-msale/p-msale.component';
import { hasRoleGuard } from './common/guards/has-role.guard';
import { NotauthorizedComponent } from './components/common/notauthorized/notauthorized.component';


export const routes: Routes = [
    {
        path: '',
        component: LobbyComponent,
        title: 'login'
    },
    {
        path: 'lobby',
        component: LobbyComponent,
        title: 'Lobby'
    },
    {
        path: 'login',
        component: LogingComponent,
        title: 'login'
    },
    {
        path: 'newsale',
        component: NewsaleComponent,
        title: 'Venta'
    },
    {
        path: 'service',
        canActivate:[hasRoleGuard("Admin")],
        component: CatalogoserviceComponent,
        title: 'Servicios'
    },
    {
        path: 'service/:id',
        canActivate:[hasRoleGuard("Admin")],
        component: ServiceeditComponent,
        title: 'neweervicio'
    },
    {
        path: 'test',
        component: ServiceComponent,
        title: 'test'
    },
    {
        path: 'details/:id',
        component: WorkdetailComponent,
        title: 'detalle del vehiculo'
    },
    {
        path: 'newventa',
        component: NewventaComponent,
        title: 'Venta nueva'
    },
    {
        path: 'paySale',
        component: PaySaleComponent,
        title: 'Pagar'
    },
    {
        path: 'sumarysale/:id',
        component: CresumenSaleComponent,
        title: 'Detalle Venta'
    },
    {
        path: 'msale',
        component: PMsaleComponent,
        title: 'Monitoring'
    },
    {
    path: 'no-autorizado',
    component: NotauthorizedComponent
    },

    { path: '*', component: LogingComponent },
];
