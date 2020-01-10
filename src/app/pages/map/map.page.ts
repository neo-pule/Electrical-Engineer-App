import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MapService } from '../../services/map.service';
import mapboxgl from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  @ViewChild('map', { static: false }) mapNativeElementnativeElement: ElementRef;
  map :any;
  route : any;
  data : any;
  tempA : number;
  tempB : number;
  obj : any;
  geocoder : any;

  constructor(private modalCtrl:ModalController,private maps : MapService,private http: HttpClient) { 
    
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  ionViewDidEnter() {
    var coordinates = document.getElementById('coordinates');
    mapboxgl.accessToken = 'pk.eyJ1IjoibmVvLXB1bGUiLCJhIjoiY2p4cTF6Z2huMGx6czNtbnY2aWdwdWU5NiJ9._Dj2fBUZgCoryf1ehZTweQ';
    this.map = new mapboxgl.Map({
      
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [28.2631339,-25.7515526],  // starting position [lng, lat]
    zoom: 9, // starting zoom
   
    });
    this.geocoder = new MapboxGeocoder({ // Initialize the geocoder
      accessToken: mapboxgl.accessToken, // Set the access token
      mapboxgl: mapboxgl, // Set the mapbox-gl instance
      marker: {
        color: 'orange',
        draggable : true,
        
      },
      
      placeholder: 'Search for places ', // Placeholder text for the search bar
      // Coordinates of UC Berkeley
    });


    this.map.addControl(this.geocoder);
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.on('load', () => {
    var start = [28.2631339,-25.7515526];
    var end = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: start
        }
      }
      ]
    };
    if (this.map.getLayer('end')) {
      this.map.getSource('end').setData(end);
    } else {
      this.map.addLayer({
        id: 'end',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: start
              }
            }]
          }
        },
        paint: {
          'circle-radius': 10,
          'circle-color': 'rgb(20, 204, 250)'
        }
      });
    }
  });
    
// initialize the map canvas to interact with later
var canvas = this.map.getCanvasContainer();

// an arbitrary start will always be the same
// only the end or destination will change

// this is where the code for the next step will go

this.map.on('mousemove', (e) => {
  document.getElementById('info').innerHTML =
  // e.point is the x, y coordinates of the mousemove event relative
  // to the top-left corner of the map3
  
  JSON.stringify(e.point) +
  '<br />' +
  // e.lngLat is the longitude, latitude geographical position of the event
  JSON.stringify(e.lngLat.wrap());
  console.log(e);
  console.log(e.lngLat);
  this.obj = e.lngLat;
  console.log(this.obj);
  });

this.map.on('click', () => {
 
  this.tempA = 28.2631339;
  this.tempB = -25.7515526;
  var start = [28.2631339,-25.7515526];
  var coords = [this.obj.lng,this.obj.lat];

  this.getRoute(coords);
  var marker   = new mapboxgl.Marker()
  .setLngLat([this.obj.lng, this.obj.lat])


  .addTo(this.map);

function onDragEnd() {
  var lngLat = marker.getLngLat();
  this.temp = lngLat.lng;
  this.temp1 = lngLat.lat;
 
  coordinates.style.display = 'block';
  console.log(lngLat.lng);
  console.log(lngLat.lat);
  console.log(this.pos);
 
  }
 
});
  }
  ngOnInit() {
   this.ionViewDidEnter();


  }
  getRoute(end) {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change

    var start = [28.2631339,-25.7515526];
   
    // console.log(end[0])
    // console.log(end[1])
    // console.log(end)
   
    var url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/';
    
    var req =  this.http.get(url + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + 'pk.eyJ1IjoibmVvLXB1bGUiLCJhIjoiY2p4cTF6Z2huMGx6czNtbnY2aWdwdWU5NiJ9._Dj2fBUZgCoryf1ehZTweQ');
    
    console.log(this.tempA)
  
    req.subscribe((obj) => {
      this.data = obj;
      this.data = this.data.routes[0];
      this.route = this.data.geometry.coordinates;
       var geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: this.route
        }
      };

      //if the route already exists on the map, reset it using setData
      if (this.map.getSource('route')) {
        this.map.getSource('route').setData(geojson);
      } else { // otherwise, make a new request
        this.map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: geojson
              }
            }
            
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3887be',
            'line-width': 5,
            'line-opacity': 0.75
          }
        });
      }

      
      console.log(this.data)
      console.log(this.route)

    });
  }
  

}
