import { Component, OnInit } from '@angular/core';
import { SCCSkillsService } from 'src/app/services/scc-skills.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  UserInfo = [];
  constructor(public profileService: SCCSkillsService, public auth: AuthGuardService,private route : Router) {
  }

  run() {
    this.route.navigateByUrl('update-profile');
  }
  signOut(){
    this.auth.signOut();
  }
  ngOnInit() {
  }

}
