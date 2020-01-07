import { Component, OnInit } from '@angular/core';
import { SCCSkillsService } from '../services/scc-skills.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  booking=[];
  items=[];
array;
slideOpts = {
  initialSlide: 1,
  speed: 400
};

sliderConfig = {
  spaceBetween:1,
  centeredSlides: true,
  slidesPerView: 1.6

}

  constructor(private list : SCCSkillsService,private route : Router) {
    //  const things = this.afs.collection('services/').valueChanges();
    //    things.subscribe((data) =>{
    //      console.log(data)});
  }
put(){
 console.log("new install")
}
put1(){
  console.log("service offered")
  this.route.navigateByUrl("/menu");
 }
 put2(){
  console.log("list services")
 }
    ngOnInit(){
    //   this.afs.collection('services/').snapshotChanges().subscribe((data: any) => {
    //         this.array = data.map(e => {
    //           return {
    //             key: e.payload.doc.id,
    //             ...e.payload.doc.data()
    //           };
    //         });
    //         console.log(this.array)
    // });

    this.booking=this.list.getBooking();
    this.items=this.list.getProducts();
  }

  addToCart(products){
    this.list.addProduct(products);
  }
}
// openCart(){
//   this.router.navigate(['nextpage'])
// }


