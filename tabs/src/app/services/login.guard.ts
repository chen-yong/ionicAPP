import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    public storageService: StorageService,
    public nav: NavController,
  ) { }
  canActivate() {
    // 判断用户是否登录
    const userinfo = this.storageService.get('userinfo');
    if (!userinfo || userinfo.name) {
      // return false;
      this.nav.navigateRoot('/login');
    } else {
      return true;
    }
  }

}
