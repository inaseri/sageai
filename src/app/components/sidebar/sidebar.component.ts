import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/forecast",
    title: "Forecast",
    rtlTitle: "پیش بینی",
    icon: "icon-chart-bar-32",
    class: ""
  },
  {
    path: "/replenishment",
    title: "Replenishment",
    rtlTitle: "دوباره پر کردن",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/upload",
    title: "Upload",
    rtlTitle: "بارگذاری",
    icon: "icon-cloud-upload-94",
    class: ""
  }

];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
