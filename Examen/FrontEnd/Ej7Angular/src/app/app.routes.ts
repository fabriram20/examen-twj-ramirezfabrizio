import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {BorracheraComponent} from "./borrachera/borrachera.component";
import {UsuarioComponent} from "./usuario/usuario.component";

export const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'borrachera', component: BorracheraComponent},
  // {path: 'borrachera/:idBorrachera/usuario', component: UsuarioComponent},
  {path: 'usuario', component: UsuarioComponent}

  // ,
  // {path: 'borrachera/:idborrachera/usuario', component: UsuarioComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
