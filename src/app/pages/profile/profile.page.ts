import { Component, OnInit } from '@angular/core';
import { SCCSkillsService } from 'src/app/services/scc-skills.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  UserInfo = [];
  constructor(public profileService: SCCSkillsService, public auth: AuthGuardService) {
    this.profileService.getUser().then((data) => {
      this.UserInfo = data;
    })
  }

  signOut(){
    this.auth.signOut();
  }
  ngOnInit() {
  }

}
