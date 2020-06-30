import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../../../services/storage.service';
import { CommonService } from '../../../services/common.service';
import { ToastController } from '@ionic/angular';  // 提示弹出层

import * as echarts from 'echarts';

@Component({
  selector: 'app-grades-stu',
  templateUrl: './grades-stu.page.html',
  styleUrls: ['./grades-stu.page.scss'],
})
export class GradesStuPage implements OnInit {

  constructor(
    public location: Location,
    public router: Router,
    public alertController: AlertController,
    public storage: StorageService,
    public commonService: CommonService,
    public toastCtrl: ToastController
  ) { }

  public course_id:any;

  ngOnInit() {
    console.log("传过来的值是："+location.pathname);
    this.course_id = location.pathname.substring(12);
    console.log(this.course_id);

    this.initEchart();//测试图表显示
    this.initEchart2();

  }


  async toastTip(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1000,
      position: 'top',
      cssClass: 'errToast',
      color,
    });
    toast.present();
  }

  // 返回上一层
  goBack() {
    window.history.go(-1);
  }

  //测试EChart图表显示
  public chart: any;
  public shu = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  initEchart() {
    let ec = echarts as any;
    let container = document.getElementById('chart');
    this.chart = ec.init(container);
    let option = {
      // title: {
      //   text: 'ECharts 入门示例'
      // },
      tooltip: {
        trigger: 'axis'
      },
      //头部标题
      legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
      },
      // symbol: 'circle',//折线点设置为实心点  不知道放在哪里
      // symbolSize: 4, //折线点的大小  不知道放在哪里
      grid: {
        left: "1%",
        // right: "1%",
        // top:"20%",
        bottom: "1%",
        borderWidth:10,
        containLabel: true  //横纵坐标有显示
      },
      //图表展示样式切换按钮
      toolbox: {  
        feature: {
          saveAsImage: {},  //图表能当做图片下载
          dataView: {show: true, readOnly: false},    //是否显示原始数据
          magicType: {show: true, type: ['line', 'bar']},  //展示图表类型
          restore: {show: true}   //图标刷新
        }
      },
      xAxis: {    //x轴
        type: 'category',
        boundaryGap: false,
        data: this.shu
      },
      yAxis: {    //y轴
        type: 'value'
      },
      series: [
        {
          name: '邮件营销',
          type: 'line',   //表现形式 ，line是折线，bar是柱状图
          stack: '总量',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          // symbol: 'circle',//折线点设置为实心点  不知道放在哪里
          // symbolSize: 4, //折线点的大小  不知道放在哪里
          type: 'line',
          stack: '总量',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          //type指定图表样式'line'（折线图） | 'bar'（柱状图） | 'scatter'（散点图） | 'k'（K线图） 
          // 'pie'（饼图） | 'radar'（雷达图） | 'chord'（和弦图） | 'force'（力导向布局图） | 'map'（地图）
          type: 'line',
          stack: '总量',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '直接访问',
          type: 'line',
          stack: '总量',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '搜索引擎',
          type: 'line',
          stack: '总量',
          data: [820, 932, 901, 934, 290, 330, 320]
        }
      ]
    };
    this.chart.setOption(option);
  }


  public  chart2: any;
  initEchart2() {
    let ec = echarts as any;
    let container2 = document.getElementById('chart2');
    this.chart2 = ec.init(container2);
    let option = {
      // title: {
      //   text: 'ECharts 入门示例'
      // },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        left: 'left',
        orient: 'vertical',
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
      },
      // symbol: 'circle',//折线点设置为实心点  不知道放在哪里
      // symbolSize: 4, //折线点的大小  不知道放在哪里
      grid: {
        left: "1%",
        right: "1%",
        bottom: "1%",
        borderWidth:10,
        containLabel: true  //横纵坐标有显示
      },
      toolbox: {  //图表能当做图片下载
        feature: {
          saveAsImage: {},
          dataView: {show: true, readOnly: false},
          magicType: {show: true, type: ['line', 'bar']},
          restore: {show: true}
        }
      },
      xAxis: {    //x轴
        type: 'category',
        boundaryGap: false,
        data:['','周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {    //y轴
        type: 'value'
      },
      series: [
        {
          name: '邮件营销',
          type: 'line',   //表现形式 ，line是折线，bar是柱状图
          stack: '总量',
          data: [,120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          //type指定图表样式'line'（折线图） | 'bar'（柱状图） | 'scatter'（散点图） | 'k'（K线图） 
          // 'pie'（饼图） | 'radar'（雷达图） | 'chord'（和弦图） | 'force'（力导向布局图） | 'map'（地图）
          type: 'bar',
          stack: '总量',
          data: [,220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          data: [,150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '直接访问',
          type: 'line',
          stack: '总量',
          data: [,320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '搜索引擎',
          type: 'line',
          stack: '总量',
          data: [,820, 932, 901, 934, 290, 330, 320]
        }
      ]
    };
    this.chart2.setOption(option);
  }


}
