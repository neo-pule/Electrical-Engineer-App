import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from '../../services/auth-guard.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SCCSkillsService } from 'src/app/services/scc-skills.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  public loginForm: FormGroup;

  mail : string;
  pass : string;

  constructor(public guards: AuthGuardService, private route : Router,private fb: FormBuilder,private index:SCCSkillsService) {

    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(12), Validators.required])],
    });


   }

   getEmail(email) {
    this.index.setEmail(email);
  }

   try(){
    this.guards.signIn(this.mail,this.pass);
    this.route.navigateByUrl('tab/sign-in');
   }

signIn(){

  this.guards.signIn(this.mail,this.pass);
  console.log("sign In page");
}

resetPass(){
  this.route.navigateByUrl('forgot-pass');
}
signUp(){
  console.log(this.loginForm.value)
  this.route.navigateByUrl('sign-up');
  console.log("sign Up page");
}

back(){
  this.route.navigateByUrl('/info');
}
  ngOnInit() {
  }

}
