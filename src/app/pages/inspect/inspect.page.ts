import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inspect',
  templateUrl: './inspect.page.html',
  styleUrls: ['./inspect.page.scss'],
})
export class InspectPage implements OnInit {

  constructor(private route : Router) { }
  run(){
    this.route.navigateByUrl("index");
  }
  ngOnInit() {
  }

}
