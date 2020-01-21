import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-install',
  templateUrl: './install.page.html',
  styleUrls: ['./install.page.scss'],
})
export class InstallPage implements OnInit {

  constructor(private route : Router) { }

  run(){
    this.route.navigateByUrl("index");
  }
  ngOnInit() {
  }

}
