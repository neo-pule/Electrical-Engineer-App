import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SCCSkillsService } from '../../services/scc-skills.service';
import { ModalController } from '@ionic/angular';

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

  constructor(private route : Router,private list : SCCSkillsService,private modalCtrl:ModalController) { 
    this.obj = this.list.getInfo();
    this.obj.subscribe(data => {
   
      this.arr = data;
      console.log(this.arr);
    })
  }
  next(docId: string){
    // console.log(docId)
    this.route.navigate(['/tab/info'],{queryParams : {key: docId}} );
    // this.route.navigate(['info'], {queryParams : {subject : this.subject,service : this.service, message : this.message}});
  }
  back(){
    this.route.navigateByUrl('/home');
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

  
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
