import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// 引入http
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from './services/common.service';
// 引入数据双向绑定
import { FormsModule} from '@angular/forms';
// 引用NG-ZORRO-MOBILE
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgZorroAntdMobileModule,
    BrowserAnimationsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CommonService, // 声明服务引用
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
