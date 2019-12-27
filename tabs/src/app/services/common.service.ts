import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // 引用http
import { resolve } from 'url';
import { StorageService } from './storage.service';

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
    public storageService: StorageService,
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

  // 封装saveLocalStorage方法
  // historyList :LocalStorage中的Key
  // keywords :LocalStorage中的Value
  saveLocalStorage(historyList: any, keywords: any) {
    /*
   1、获取本地存储里面的历史记录数据
   2、判断本地存储的历史记录是否存在
   3、存在：把新的历史记录和以前的历史记录拼接 ,然后重新保存 （去重）
   4、不存在：直接把新的历史记录保存到本地
   */
    console.log(historyList, keywords);
    let history = this.storageService.get(historyList);
    if (history) { // 存在历史记录
      if (history.indexOf(keywords.trim()) === -1) {
        if (keywords.trim().length > 0) {
          history.push(keywords.trim());
        }
      }
      this.storageService.set(historyList, history);
    } else {  // 不存在
      if (keywords.trim().length > 0) {
        history = [];
        history.push(keywords.trim());
        this.storageService.set(history, history);
      }
    }
  }


}
