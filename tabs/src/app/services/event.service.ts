import { Injectable } from '@angular/core';
import { EventEmitter } from 'eventemitter3';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public event: any;
  constructor() {
    // 不同页面实现数据通信
    this.event = new EventEmitter();
  }
}
