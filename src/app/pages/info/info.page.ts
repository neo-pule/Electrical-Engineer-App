import { Component, OnInit,Input } from '@angular/core';
import { Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
@Input() subject :string
@Input() message :string
@Input() service :string

temp;
temp1;
temp2;
  constructor(private addr : ActivatedRoute, private route : Router) { }

next1(){
  this.route.navigateByUrl('index');
}

  ngOnInit() {

    this.addr.queryParams.subscribe(data => {
      console.log(data);

      this.temp = data.subject;
      console.log(this.temp);

      this.temp1 = data.message;
      console.log(this.temp1);

      this.temp2 = data.service;
      console.log(this.temp2);
    })
  }

}
