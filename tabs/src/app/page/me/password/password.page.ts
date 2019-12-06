import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  public userid:any;  //用户id
  public userPassword:any="123abc";  //真正的密码
  public oldPassword:any;   //输入的旧密码
  public newPassword1:any;  
  public newPassword2:any;

  public pwshow:any=false;
  public pwshow2:any=false;
  public pwshow3:any=false;

  constructor(
    public lacation:Location,
    public router:Router
  ) { 
  }

  ngOnInit() {
      // 接收课程ID
      console.log(location.pathname);
      this.userid = location.pathname.substring(9);
      console.log('用户ID:' + this.userid);
      // 根据用户ID查找用户密码
      // this.getPassword();
  }

  // //根据用户id获取用户密码
  // getPassword(id){
     
  // }

  confirm(){
    if(this.oldPassword != this.userPassword){
      alert("原密码输入错误！");
      console.log(this.newPassword1)
    }
    else if(this.newPassword1!=this.newPassword2){
      alert("密码修改失败!两次新密码不一致")
    }else{
      alert("密码修改成功");
      this.router.navigate(['/userinfo/',this.userid]);
    }

  }
}
