import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';
import { ChartsModule } from "ng2-charts";

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

// Angular Material Inputs
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { ForcastDashboardComponent } from './pages/forcast-dashboard/forcast-dashboard.component';
import { ReplenishmentDashboardComponent } from './pages/replenishment-dashboard/replenishment-dashboard.component';
import { UploadDashboardComponent } from './pages/upload-dashboard/upload-dashboard.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    ChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, ForcastDashboardComponent, ReplenishmentDashboardComponent, UploadDashboardComponent, LoginComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
