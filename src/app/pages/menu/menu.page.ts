import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SCCSkillsService } from '../../services/scc-skills.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
 subject : string;
 message : string;
 service : string;

 obj :any;
 arr;

  constructor(private route : Router,private list : SCCSkillsService) { 
    this.obj = this.list.getInfo();
    this.obj.subscribe(data => {
      console.log(data);
      this.arr = data;
      console.log(this.arr);
    })
  }

  next(){
    this.route.navigateByUrl('info');
    // this.route.navigate(['info'], {queryParams : {subject : this.subject,service : this.service, message : this.message}});
  }
  Put(){
    console.log(this.arr);
  }
  getData(){
    this.list.getInfo().subscribe(data => {
      console.log(data);
      this.obj = data;
      console.log(this.obj);
    })
   console.log("new install")
  }
  ngOnInit() {
  
  }

}
