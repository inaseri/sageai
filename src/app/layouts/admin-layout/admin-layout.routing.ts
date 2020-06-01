import { Routes } from "@angular/router";

import { ForcastDashboardComponent } from "../../pages/forcast-dashboard/forcast-dashboard.component";
import { ReplenishmentDashboardComponent } from "../../pages/replenishment-dashboard/replenishment-dashboard.component";
import { UploadDashboardComponent } from "../../pages/upload-dashboard/upload-dashboard.component";

export const AdminLayoutRoutes: Routes = [
  { path: "forecast", component: ForcastDashboardComponent },
  { path: "replenishment", component: ReplenishmentDashboardComponent },
  { path: "upload", component: UploadDashboardComponent },
];
