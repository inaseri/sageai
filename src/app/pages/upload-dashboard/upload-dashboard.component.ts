import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";

@Component({
  selector: 'app-upload-dashboard',
  templateUrl: './upload-dashboard.component.html',
  styleUrls: ['./upload-dashboard.component.scss']
})
export class UploadDashboardComponent implements OnInit {

  historicalFileToUpload: any;
  eventFileToUpload: any;
  productFileToUpload: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  handleHistoricalFileInput(files: FileList) {
    this.historicalFileToUpload = files.item(0);
  }

  handleEventFileInput(files: FileList) {
    this.eventFileToUpload = files.item(0);
  }

  handleProductFileInput(files: FileList) {
    this.historicalFileToUpload = files.item(0);
  }
  uploadHistoricalFile() {
    this.apiService.postFile(this.historicalFileToUpload, 'upload/historical/').subscribe(
      response => alert(response),
      error => console.log('There is some problem: ', error)
    );
  }

  uploadProductFile() {
    this.apiService.postFile(this.productFileToUpload, 'upload/product/').subscribe(
      response => alert(response),
      error => console.log('There is some problem: ', error)
    );
  }

  uploadEventFile() {
    this.apiService.postFile(this.eventFileToUpload, 'upload/event/').subscribe(
      response => alert(response),
      error => console.log('There is some problem: ', error)
    );
  }
}
