import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  // 保存localStage
  set(key: any, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  // 读取localStorage
  get(key: any) {
    return JSON.parse(localStorage.getItem(key));
  }
  // 删除localStorage
  remove(key: any) {
    localStorage.removeItem(key);
  }
}
