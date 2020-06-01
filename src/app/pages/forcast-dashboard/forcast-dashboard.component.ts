import {Component, OnInit} from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Predict } from "../../models/predict/predict";
import { Product } from "../../models/product/product";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-forcast-dashboard',
  templateUrl: './forcast-dashboard.component.html',
  styleUrls: ['./forcast-dashboard.component.scss']
})
export class ForcastDashboardComponent implements OnInit {

  predict_data: Predict;
  products: any;
  datesList: any;
  loading = false;
  loading2 = false;
  start_date: string;
  end_date: string;
  dict: any = [];
  item_id: number;
  confidence = '0.75';
  product_title: string;
  save: number;
  selectedDeviceObj: Product;
  closeResult: string;


  public showChart = false;
  public chartType = 'line';
  public chartDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], price: [], discount: [], label: 'Actual' },
    { data: [10, 48, 29, 49, 100, 27, 19], price: [], discount: [], label: 'Prediction' },
    { data: [40, 53, 60, 19, 40, 19, 47], price: [], discount: [], label: 'Lower Bound' },
    { data: [28, 48, 98, 61, 102, 50, 86], price: [], discount: [], label: 'Upper Bound' },
  ];
  public chartLabels: Array<any> = [];
  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(249, 0, 4, 0)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(249, 0, 4, 0)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(249, 0, 4, 0)',
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(249, 0, 4, 0)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
    }
  ];
  public chartOptions: any = {
    responsive: true,
    tooltips: {
      callbacks: {

        label: function(tooltipItem: any, data: any) {
          const legend = new Array();
          // tslint:disable-next-line:forin
          for (const i in data.datasets) {
            if (data.datasets[i].data[tooltipItem.index]) {
              legend.push(
                data.datasets[i].label + ': ' + parseFloat(data.datasets[i].data[tooltipItem.index])
              );
              legend.push('price: ' + parseFloat(data.datasets[i].price[tooltipItem.index]));
              legend.push('discount: ' + parseFloat(data.datasets[i].discount[tooltipItem.index]));
            }
          }
          return legend;
        },
      }
    },
  };

  public chartClicked(_e: any): void {}
  public chartHovered(_e: any): void {}

  constructor (private apiService: ApiService, private modalService: NgbModal) {
    this.predict_data = new Predict();
  }

  ngOnInit() {
    this.get_products();
  }

  get_chart() {
    if (typeof this.start_date === 'undefined' && typeof this.end_date === 'undefined') {
      this.apiService.predict(this.item_id + '/' + this.confidence).subscribe(
        response => {
          this.create_chart_model(response);
          this.get_dates();
        },
        error2 => {
          console.log('there is some problem:', error2);
        }
      );
    } else if (this.start_date != null && this.end_date != null ) {
      this.start_date = new Date(this.start_date).toISOString().slice(0, 10);
      this.end_date = new Date(this.end_date).toISOString().slice(0, 10);
      this.apiService.predict(
        this.item_id  + '/' + this.confidence + '/' + this.start_date + '/' + this.end_date).subscribe(
        response => {
          this.create_chart_model(response);
          this.get_dates();
        },
        error2 => {
          console.log('there is some problem:', error2);
        }
      );
    } else if (typeof this.end_date === 'undefined') {
      this.start_date = new Date(this.start_date).toISOString().slice(0, 10);
      this.end_date = 'None';
      this.apiService.predict(
        this.item_id + '/' + this.confidence + '/' + this.start_date + '/' + this.end_date).subscribe(
        response => {
          this.create_chart_model(response);
          this.get_dates();
        },
        error2 => {
          console.log('there is some problem:', error2);
        }
      );
    } else {
      this.end_date = new Date(this.end_date).toISOString().slice(0, 10);
      this.start_date = 'None';
      this.apiService.predict(
        this.item_id + '/' + this.confidence + '/' + this.start_date + '/' + this.end_date).subscribe(
        response => {
          this.create_chart_model(response);
          this.get_dates();
        },
        error2 => {
          console.log('there is some problem:', error2);
        }
      );
    }
  }

  get_products() {
    this.apiService.products().subscribe(
      response => this.products = response,
      error2 => console.log('There is some problems', error2)
    );
  }

  get_dates() {
    this.apiService.future_data_list(this.item_id).subscribe(
      response => {
        for (const key in response) {
          // check if the property/key is defined in the object itself, not in parent
          if (response.hasOwnProperty(key)) {
            const inDate = response[key].date.toString();
            const inDateFormated = inDate.slice('T', -10);
            response[key].date = inDateFormated;
          }
        }
        this.datesList = response;
      },
      error2 => {
        console.log('There is some problems', error2);
      }
    );
  }

  on_change(object: Product) {
    console.log('item id:  dsfasldk jfl;aksjdf ', object.product_id);
    this.item_id = object.product_id;
    this.product_title = object.title_fa;
  }

  change_inputs_future(date: string, price: string, discount: string, promotion: number) {
    this.dict.push({
      date: date.toString(),
      daily_price: Number(price),
      discount: discount.toString(),
      promotion: promotion
    });
  }

  create_future() {
    for (const key in this.dict) {
      // check if the property/key is defined in the object itself, not in parent
      if (this.dict.hasOwnProperty(key)) {
        for (let i = 0; i < this.dict.length - 1; i++) {
          if (this.dict[i].date.toString() === this.dict[i + 1].date.toString()) {
            if (typeof this.dict[i + 1].daily_price === 'string' && typeof this.dict[i + 1].discount === 'string') {
              this.dict.splice(i + 1, 1);
              console.log('in both string')
            } else {
              this.dict.splice(i, 1);
              console.log('in one string')
            }
          }
        }
      }
    }
    this.loading = true;
    this.apiService.get_future(this.item_id, this.confidence, this.dict, 0).subscribe(
      response => {
        this.create_chart_model(response);
        this.loading = false;
      }
    );
  }

  save_future() {
    for (const key in this.dict) {
      // check if the property/key is defined in the object itself, not in parent
      if (this.dict.hasOwnProperty(key)) {
        for (let i = 0; i < this.dict.length - 1; i++) {
          if (this.dict[i].date.toString() === this.dict[i + 1].date.toString()) {
            if (typeof this.dict[i + 1].daily_price === 'string' && typeof this.dict[i + 1].discount === 'string') {
              this.dict.splice(i + 1, 1);
              console.log('in both string')
            } else {
              this.dict.splice(i, 1);
              console.log('in one string')
            }
          }
        }
      }
    }
    this.loading2 = true;
    this.apiService.get_future(this.item_id, this.confidence, this.dict, 1).subscribe(
      response => {
        this.create_chart_model(response);
        this.loading2 = false;
        alert('Your change saved successfully.')
      }
    );
  }

  create_chart_model(response_results: any) {
    const arrayOfLabels = [];
    const array_upper = [];
    const array_lower = [];
    const array_actual = [];
    const array_predection = [];
    const array_price = [];
    const array_discount = [];
    for (const key in response_results) {
      // check if the property/key is defined in the object itself, not in parent
      if (response_results.hasOwnProperty(key)) {
        // get and set labels of chart
        const date_label = new Date(response_results[key].date).toISOString().slice(0, 10);
        arrayOfLabels.push(date_label.toString());
        array_upper.push(response_results[key].y_prediction_upper);
        array_lower.push(response_results[key].y_prediction_lower);
        array_actual.push(response_results[key].y_actual);
        array_predection.push(response_results[key].y_prediction);
        array_price.push(response_results[key].daily_price);
        array_discount.push(response_results[key].discount);
      }
    }
    let length = 0;
    array_actual.forEach(function (value) {
      if (value != null) {
        length = length + 1;
      }
    });

    this.chartLabels = arrayOfLabels;
    this.chartDatasets[0].data = array_actual;
    this.chartDatasets[1].data = array_predection;
    this.chartDatasets[2].data = array_lower;
    this.chartDatasets[3].data = array_upper;

    this.chartDatasets[0].price = array_price;
    this.chartDatasets[1].price = array_price;
    this.chartDatasets[2].price = array_price;
    this.chartDatasets[3].price = array_price;

    this.chartDatasets[0].discount = array_discount;
    this.chartDatasets[1].discount = array_discount;
    this.chartDatasets[2].discount = array_discount;
    this.chartDatasets[3].discount = array_discount;


    for (let i = 0; i < length; i++) {
      this.chartDatasets[2].data[i] = null;
      this.chartDatasets[3].data[i] = null;
    }

    this.showChart = true;
    return response_results;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
