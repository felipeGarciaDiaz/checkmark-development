import {
  APP_INITIALIZER,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './_services/interceptors/auth-interceptor';
import { StorageService } from './_services/storage.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './views/login/login.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './components/toast/toast.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { MaterialModule } from './material.module';
import { NavComponent } from './views/global/nav/nav.component';
import { NgxPermissionsModule } from 'ngx-permissions';

export function initializeApp(myService: StorageService) {
  return () => myService.Init();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToastComponent,
    DashboardComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxPermissionsModule.forRoot(),
    
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [StorageService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
