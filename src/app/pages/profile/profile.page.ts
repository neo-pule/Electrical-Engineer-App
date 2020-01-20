import { Component, OnInit } from '@angular/core';
import { SCCSkillsService } from 'src/app/services/scc-skills.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  UserInfo = [];
  constructor(public profileService: SCCSkillsService) {
    this.profileService.getUser().then((data) => {
      this.UserInfo = data;
    })
  }

  ngOnInit() {
  }

}
