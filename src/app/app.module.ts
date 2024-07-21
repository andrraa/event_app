import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { httpInterceptor } from './core/interceptor/http.interceptor';

@NgModule({
  declarations: [AppComponent, DashboardComponent, NavigationComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    provideHttpClient(withInterceptors([httpInterceptor]), withFetch()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
