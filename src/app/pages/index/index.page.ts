import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  constructor( private route : Router) { }

signIn(){
  this.route.navigateByUrl('sign-in');
  console.log("sign In page");
}
signUp(){
  this.route.navigateByUrl('sign-up');
  console.log("sign Up page");
}

  ngOnInit() {
  }

}
