import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { User } from "../models/user/user";
import { Group } from "../models/gropu/group";
import { Future } from "../models/future/future";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_path = 'http://127.0.0.1:8000/api/';
  token = 'token';

  public user = localStorage.getItem('user_id_sage');
  public isUserLoggedIn: boolean;
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // Handle API errors
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error['error']}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


  login(item: User): Observable<User> {
    return this.http
      .post<User>(this.base_path + 'login', JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  create_group(item: any): Observable<Group> {
    return this.http
      .post<Group>(this.base_path + 'permission/group/create/', JSON.stringify(item), { headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('token_sage')
          })
      })
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  register_user(item: User): Observable<User> {
    return this.http
      .post<User>(this.base_path + 'permission/user/create/', JSON.stringify(item), { headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('token_sage')
          })
      })
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  predict(link: string): Observable<any> {
    return this.http
      .get<any>(this.base_path + 'get_predicted_items/' + link, { headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('token_sage')
          })
      })
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  products(): Observable<any> {
    return this.http
      .get<any>(this.base_path + 'products', {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('token_sage')
          })
      })
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  future_data_list(item_id: number): Observable<any> {
    return this.http
      .get<any>(this.base_path + 'future/data/' + item_id , {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('token_sage')
          })
      })
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  get_future(item_id: number, confidence_percentage: string, data: Future, save: number): Observable<Future> {
    return this.http
      .post<Future>(this.base_path + 'future/' + item_id + '/' + confidence_percentage + '/' + save, JSON.stringify(data),
        { headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('token_sage')
          }) })
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  get_max_category_level(): Observable<any> {
    return this.http
      .get<any>(this.base_path + 'replenishment/max_level/',
        { headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('token_sage')
          }) })
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  get_children_categories(data: any): Observable<any> {
    return this.http
      .post<any>(this.base_path + 'replenishment/category/', JSON.stringify(data),
        { headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('token_sage')
          }) })
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  filtered_products(item: any): Observable<any> {
    return this.http
      .post<any>(this.base_path + 'replenishment/products/', JSON.stringify(item),
        { headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('token_sage')
          }) })
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  get_filtered_products(item: any): Observable<any> {
    return this.http
      .post<any>(this.base_path + 'replenishment/product/id/', JSON.stringify(item),
        { headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('token_sage')
          }) })
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  postFile(fileToUpload: File, link: string): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http
      .post<any>(this.base_path + link, formData, { headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Token ' + localStorage.getItem('token_sage')
        }) })
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }
}
