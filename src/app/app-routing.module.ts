import { FinalizadorComponent } from './finalizador/finalizador.component';
import { AuthGuard } from './auth.guard';
import { AdministradorComponent } from './administrador/administrador.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TriadorComponent } from './triador/triador.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'administrador',
        component: AdministradorComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'triador',
        component: TriadorComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'finalizador',
        component: FinalizadorComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        component: PageNotFoundComponent
      }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {
}