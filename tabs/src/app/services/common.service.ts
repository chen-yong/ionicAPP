import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'; // 引用http
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // 请求地址
  public config: any = {
    // 域名：
    domain: ''
  };

  constructor(
    public http: HttpClient,
  ) { }
  // 封装get方法
  // tslint:disable-next-line:ban-types
  get(url: String) {
    // tslint:disable-next-line:no-shadowed-variable
    const api = this.config.domain + url;
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, reject) => {
      this.http.get(api).subscribe((response) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }
  // 封装post方法
  // tslint:disable-next-line:ban-types
  post(url: String, json: Object) {
    // tslint:disable-next-line:prefer-const
    let api = this.config.domain + url;
    return new Promise((resove, reject) => {
      this.http.post(api, json).subscribe((response) => {
        resove(response);
      }, (error) => {
        reject(error);
      });
    });
  }

}
