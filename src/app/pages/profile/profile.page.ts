import { Component, OnInit } from '@angular/core';
import { SCCSkillsService } from 'src/app/services/scc-skills.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  UserInfo = [];
  constructor(public afAuth :AngularFireAuth,public profileService: SCCSkillsService, public auth: AuthGuardService,private route : Router) {
  }
  runs() {
    this.route.navigateByUrl('index');
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
