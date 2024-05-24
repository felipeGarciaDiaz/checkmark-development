import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { ResultsComponent } from './views/results/results.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: ResultsComponent },

  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }