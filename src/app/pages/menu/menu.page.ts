import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
 subject : string;
 message : string;
 service : string;
  constructor(private route : Router) { }

  next(){
    this.route.navigateByUrl('info');
    // this.route.navigate(['info'], {queryParams : {subject : this.subject,service : this.service, message : this.message}});
  }
  ngOnInit() {
  }

}
