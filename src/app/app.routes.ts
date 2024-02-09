import { Routes } from '@angular/router';
import { LobbyComponent } from './page/lobby/lobby.component';
import { LogingComponent } from './components/loging/loging.component';
import { NewsaleComponent } from './page/newsale/newsale.component';
import { CatalogoserviceComponent } from './page/catalogoservice/catalogoservice.component';
import { ServiceeditComponent } from './components/serviceedit/serviceedit.component';
import { ServiceComponent } from './page/service/service.component';

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
        component: CatalogoserviceComponent,
        title: 'Servicios'
    },
    {
        path: 'service/:id',
        component: ServiceeditComponent,
        title: 'neweervicio'
    },
    {
        path: 'test',
        component: ServiceComponent,
        title: 'test'
    },


    { path: '*', component: LogingComponent },
];
