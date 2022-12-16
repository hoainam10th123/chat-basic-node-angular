import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../models/user';
import { AccountService } from '../services/account.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: IUser;

  constructor(public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.khoiTaoForm();
  }

  private khoiTaoForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  login() {
    this.accountService.login(this.loginForm.value).subscribe({
      next: () => {
        this.toastr.success('Đăng nhập thành công!');
        this.router.navigateByUrl('/');
      },
      error: (e) => {
        console.error(e)
        this.toastr.error('loi khi dang nhap');
      }
    })
  }

}
