import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editwork',
  templateUrl: './editwork.page.html',
  styleUrls: ['./editwork.page.scss'],
})
export class EditworkPage implements OnInit {
  public workId = '';
  public workInfo: any = {
    name: '',
    tacticsList: [] = [
      { id: 1, name: '作业1', },
      { id: 2, name: '作业2', },
    ],
    tactics: '作业1',
    startTime: '',
    endTime: '',
    addTime: '',
    explain: '',
    falg: 'false',
    falgTime: '',
    score: '',
    showGradeList: [] = [
      { id: 1, name: '展示分数' },
      { id: 2, name: '不展示分数' },
    ],
    showGrade: '展示分数',
    parRadioList: [] = [
      { id: 1, value: '1', name: '禁止复制题目', isChecked: 'true' },
      { id: 2, value: '2', name: '禁止右键', isChecked: 'true' },
      { id: 3, value: '3', name: '开启学生端阅卷', isChecked: 'false' },
      { id: 4, value: '4', name: '查卷时标准答案可见', isChecked: 'false' },
    ]
  };
  // 自定义option
  public customPickerOptions = {
    buttons: [{
      text: '取消',
      handler: () => console.log('取消!')
    }, {
      text: '确认',
      handler: () => {
        console.log('确认');
      }
    }]
  };

  constructor(
    public router: Router,
  ) { }

  ngOnInit() {
    console.log('URl:' + location.pathname);
    this.workId = location.pathname.substring(9);
  }
  goBack(workId) {
    this.router.navigate(['/work/' + workId]);
  }
  signUp() {
    console.log('表单提交');
    console.log(this.workInfo);
  }
  datetimeChange(e) {
    console.log(e.detail.value);
  }

}
