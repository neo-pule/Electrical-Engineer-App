import { Component, OnInit } from '@angular/core';
import { SCCSkillsService } from 'src/app/services/scc-skills.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {
  UserInfo = [];
  constructor(public UpdateProfileService: SCCSkillsService) {
    this.UpdateProfileService.getUser().then((data) => {
      this.UserInfo = data;
      // console.log(this.UserInfo)
    })
  }

  ngOnInit() {
  }

}
