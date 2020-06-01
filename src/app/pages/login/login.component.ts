import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { User } from "../../models/user/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  data: User;
  is_admin: boolean;

  constructor(
    public apiService: ApiService,
    public router: Router,
  ) {
    this.data = new User();
  }

  ngOnInit(): void {
  }

  loginForm() {
    this.apiService.login(this.data).subscribe(
      response => {
        this.router.navigate(['/forecast']);

        // this two below lines use for save user id and token in to local storage.
        this.apiService.token = response.token;
        this.apiService.isUserLoggedIn = true;
        localStorage.setItem('token_sage', response.token);
        this.is_admin = response.is_admin;
        if (this.is_admin) {
          localStorage.setItem('is_admin_sage', 'True');
        } else {
          localStorage.setItem('is_admin_sage', 'False');
        }


        // this line use for reload after login.
        window.location.assign('/forecast');
      },
      error => {
        console.log(error);
      }
    );
  }

}
