import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addwork',
  templateUrl: './addwork.page.html',
  styleUrls: ['./addwork.page.scss'],
})
export class AddworkPage implements OnInit {
  public workId = '';
  public workInfo: any = {
    name: '',
    tacticsSelectList: [] = [
      { id: 1, name: '作业1', selected: 'true', value: 'true' },
      { id: 2, name: '作业2', selected: 'flase', value: 'false' },
      { id: 3, name: '作业3', selected: 'flase', value: 'false' },
      { id: 4, name: '作业4', selected: 'flase', value: 'false' },
      { id: 5, name: '作业5', selected: 'flase', value: 'false' }
    ],
    startTime: '2019-12-02',
    endTime: '2019-12-02',
    addTime: '2019-12-02',
    explain: '',
    falg: '',
    falgTime: '2019-12-02',
    score: '',
    showSelectList: [] = [
      { id: 1, show: '展示分数' },
      { id: 2, show: '不展示分数' },
    ],
    parRadioList: [] = [
      { id: 1, value: '1', name: '禁止复制题目', checked: 'true' },
      { id: 2, value: '2', name: '禁止右键', checked: 'false' },
      { id: 3, value: '3', name: '开启学生端阅卷', checked: 'false' },
      { id: 4, value: '4', name: '查卷时标准答案可见', checked: 'false' },
    ]
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
  }

}
