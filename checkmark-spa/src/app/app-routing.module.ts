
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    component: DashboardComponent
  },
  // Add other routes here as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

