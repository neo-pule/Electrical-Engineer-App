import { Component, OnInit,Input } from '@angular/core';
import { Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { IndexPage } from '../../pages/index/index.page';
import { SCCSkillsService } from 'src/app/services/scc-skills.service';
@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
@Input() subject :string
@Input() message :string
@Input() service :string
@Input() key :string

temp;
temp1;
temp2;
private docKey: string = null;
private serviceName: string = null;
private cost: string = null;
private description: string = null;
private coome: string = null;

private obj: any;

  constructor(public popoverController: PopoverController,private addr : ActivatedRoute, 
    private route : Router,private modalCtrl:ModalController, private apiSerice: SCCSkillsService) { }

next1(){
  this.route.navigateByUrl('/index');
}
back(){
  this.route.navigateByUrl('/menu');
}
async presentModal() {
  const modal = await this.modalCtrl.create({
    component: IndexPage
  });
  return await modal.present();
}
async presentPopover(ev: any) {
  const popover = await this.popoverController.create({
    component: IndexPage,
    event: ev,
    translucent: true
  });
  return await popover.present();
}

  ngOnInit() {

    this.addr.queryParams.subscribe(data => {
      // console.log(data);

      // this.temp = data.subject;
      // console.log(this.temp);

      

      this.docKey = data.key;


      this.apiSerice.getDoc(this.docKey).subscribe(data=>{
        console.log(data)
        this.obj = data;
      });


      this.apiSerice.getDocComments(this.docKey).subscribe(data=>{
        console.log(data)
      });


      // this.temp1 = data.message;
      // console.log(this.temp1);

      // this.temp2 = data.service;
      // console.log(this.temp2);
    })
  }

}
