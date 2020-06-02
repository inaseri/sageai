import { Component, OnInit, NgModule, ViewChild, ViewContainerRef } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Category } from "../../models/category/category";
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import * as XLSX from 'xlsx';

@NgModule({
  exports: [
    MatSelectModule,
    MatTabsModule
  ]
})
@Component({
  selector: 'app-replenishment-dashboard',
  templateUrl: './replenishment-dashboard.component.html',
  styleUrls: ['./replenishment-dashboard.component.scss']
})
export class ReplenishmentDashboardComponent implements OnInit {

  head_title = ['Image', 'Product Name', 'Category', 'Days To Reorder', 'Reorder Amount'];
  fileName = 'ExcelSheet.xlsx';
  parent_category: Category;
  filter_by_products_list: any[] = [];
  max_level_cat: any;
  filtered_product: any[] = [];
  category: Category;
  showTable = false;
  filter_by_product = true;
  filter_by_category = false;
  product_id: any[] = [];
  select_2_disable = 1;
  select_3_disable = 1;
  select_1_array: any[] = [];
  select_2_array: any[] = [];
  select_3_array: any[] = [];
  product_data: any[] = [];
  days_filter: string;

  constructor(private apiService: ApiService) {}


  ngOnInit(): void {
    this.get_products();
    this.get_categories();
  }

  get_products() {
    this.apiService.products().subscribe(
      response => this.filter_by_products_list = response,
      error2 => console.log('There is some problems', error2)
    );
    this.apiService.get_max_category_level().subscribe(
      response => this.max_level_cat = response.max_level,
      error => console.log('There is some problem: ', error)
    );
  }

  on_change_product(product_id: string) {
    this.product_id.push({
      product_ids: product_id,
    });
  }

  export_excel(): void {
    /* table id is passed over here */
    const element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }

  filter($event) {
    const value = [$event.index]
    if (value[0] == 0) {
      this.filter_by_product = true;
      this.filter_by_category = false;
      this.showTable = false;
      this.select_2_array = [];
      this.select_3_array = [];
      this.product_data = [];
    } else {
      this.filter_by_category = true;
      this.filter_by_product = false;
      this.showTable = false;
      this.select_2_array = [];
      this.select_3_array = [];
      this.product_data = [];
    }
  }

  get_categories() {
    this.apiService.get_children_categories(this.category).subscribe(
      response => {
        this.parent_category = response;
      },
      error => {
        console.log('There is some problem: ', error);
      }
    );
  }

  selected_categories_2(name: string, value: string) {
    if (this.select_2_disable == 1) {
      this.select_2_disable = 0;
    }
    const dict: { name: string, value: string } = { name: name, value: value };
    let dict2 = {}
    this.apiService.get_children_categories(dict).subscribe(
      response => {
        for (const key in response) {
          // check if the property/key is defined in the object itself, not in parent
          if (response.hasOwnProperty(key)) {
            this.select_2_array.push({
              name: response[key].name,
              value: response[key].value
            });
            dict2 = { name: response[key].name, value: response[key].value};
            this.apiService.get_children_categories(dict2).subscribe(
              response => {
                for (const key in response) {
                  // check if the property/key is defined in the object itself, not in parent
                  if (response.hasOwnProperty(key)) {
                    this.select_3_array.push({
                      name: response[key].name,
                      value: response[key].value
                    });
                  }
                }
              },
              error => console.log('There is some problem: ', error)
            );
          }
        }
      },
      error => console.log('There is some problem: ', error)
    );
  }

  selected_categories_3(name: string, value: string) {
    if (this.select_3_disable == 1) {
      this.select_3_disable = 0;
    }
    const dict: { name: string, value: string } = { name: name, value: value };
    this.apiService.get_children_categories(dict).subscribe(
      response => {
        for (const key in response) {
          // check if the property/key is defined in the object itself, not in parent
          if (response.hasOwnProperty(key)) {
            this.select_3_array.push({
              name: response[key].name,
              value: response[key].value
            });
          }
        }
      },
      error => console.log('There is some problem: ', error)
    );
  }

  get_product() {
    if (this.filter_by_category) {
      console.log('select array 2', this.select_2_array)
      console.log('select array 3',this.select_3_array)
      this.filtered_product = this.select_3_array;
      this.apiService.filtered_products(this.filtered_product).subscribe(
        response => {
          this.product_data = response;
          for (let idx = 0; idx < this.product_data.length; idx++) {
            this.product_data[idx].days_to_reorder = '3';
            this.product_data[idx].amount_reorder = '3';
          }
          this.showTable = true;
        },
        error => {
          console.log('There is some problem: ', error);
        }
      );
    } else if (this.filter_by_product) {
      this.apiService.get_filtered_products(this.product_id).subscribe(
        response => {
          this.product_data = response;
          for (let idx = 0; idx < this.product_data.length; idx++) {
            this.product_data[idx].days_to_reorder = 3;
            this.product_data[idx].amount_reorder = 3;
          }
          this.showTable = true;
        }
      );
    }
  }

}
