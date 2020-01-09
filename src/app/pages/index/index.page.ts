import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  public loginForm: FormGroup;


  constructor( private route : Router,private fb: FormBuilder) {

    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(12), Validators.required])],
    });


   }

signIn(){
  this.route.navigateByUrl('sign-in');
  console.log("sign In page");
}
signUp(){
  this.route.navigateByUrl('sign-up');
  console.log("sign Up page");
}
back(){
  this.route.navigateByUrl('/info');
}
  ngOnInit() {
  }

}
