import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MapService } from '../../services/map.service';
import mapboxgl from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';
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
  xx = {
    lat : Number,
    lng : Number
  };
  constructor(private maps : MapService,private http: HttpClient) { 
    // this.map.run();
  }

  ngOnInit() {
    var coordinates = document.getElementById('coordinates');
    mapboxgl.accessToken = 'pk.eyJ1IjoibmVvLXB1bGUiLCJhIjoiY2p4cTF6Z2huMGx6czNtbnY2aWdwdWU5NiJ9._Dj2fBUZgCoryf1ehZTweQ';
    this.map = new mapboxgl.Map({
      
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [28.2631339,-25.7515526],  // starting position [lng, lat]
    zoom: 9 // starting zoom
    
    });
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
    
    // set the bounds of the map
var bounds = [[28.2631339,-25.7515526],[28.500239,-25.269094]];
// this.map.setMaxBounds(bounds);

// initialize the map canvas to interact with later
var canvas = this.map.getCanvasContainer();

// an arbitrary start will always be the same
// only the end or destination will change


// this is where the code for the next step will go



this.map.on('click', () => {
  // this.xx.lat = 28.2631339,
  //   lng : -25.7515526
  // };

  this.tempA = 28.2631339;
  this.tempB = -25.7515526;
  var start = [28.2631339,-25.7515526];
  var coords = [27.945429617187525,-26.337291741728087];

  this.getRoute(coords);


 
});


  }
  getRoute(end) {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change

    var start = [28.2631339,-25.7515526];
    //  var end = [bb,dd] 
    
    // this.tempA = obj.lat;
    // this.tempB = obj.lng;
    console.log(end[0])
    console.log(end[1])
    console.log(end)
   
    // console.log(this.http.get(url + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + 'pk.eyJ1IjoibmVvLXB1bGUiLCJhIjoiY2p4cTF6Z2huMGx6czNtbnY2aWdwdWU5NiJ9._Dj2fBUZgCoryf1ehZTweQ'))
    // // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    //  + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;
     //this.http.get(url + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + 'pk.eyJ1IjoibmVvLXB1bGUiLCJhIjoiY2p4cTF6Z2huMGx6czNtbnY2aWdwdWU5NiJ9._Dj2fBUZgCoryf1ehZTweQ');
    // var  end =[-26.337292,27.94543]
    var url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/';
    
    var req =  this.http.get(url + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + 'pk.eyJ1IjoibmVvLXB1bGUiLCJhIjoiY2p4cTF6Z2huMGx6czNtbnY2aWdwdWU5NiJ9._Dj2fBUZgCoryf1ehZTweQ');
    // req.responseType = 'json';
    console.log(this.tempA)
    // req.open('GET', url, true);
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
  // var data = obj.routes[0]
      // var geojson = {
      //   type: 'Feature',
      //   properties: {},
      //   geometry: {
      //     type: 'LineString',
      //     coordinates: route
      //   }
      // };
    });
    // req.onload = function() {
    //   var data = req.response.routes[0];
    //   var route = data.geometry.coordinates;
    //   var geojson = {
    //     type: 'Feature',
    //     properties: {},
    //     geometry: {
    //       type: 'LineString',
    //       coordinates: route
    //     }
    //   };
    //   // if the route already exists on the map, reset it using setData
    //   if (this.map.getSource('route')) {
    //     this.map.getSource('route').setData(geojson);
    //   } else { // otherwise, make a new request
    //     this.map.addLayer({
    //       id: 'route',
    //       type: 'line',
    //       source: {
    //         type: 'geojson',
    //         data: {
    //           type: 'Feature',
    //           properties: {},
    //           geometry: {
    //             type: 'LineString',
    //             coordinates: geojson
    //           }
    //         }
            
    //       },
    //       layout: {
    //         'line-join': 'round',
    //         'line-cap': 'round'
    //       },
    //       paint: {
    //         'line-color': '#3887be',
    //         'line-width': 5,
    //         'line-opacity': 0.75
    //       }
    //     });
    //     // this.map.addLayer({
    //     //   id: 'route',
    //     //   type: 'line',
    //     //   source: {
    //     //     type: 'geojson',
    //     //     data: {
    //     //       type: 'Feature',
    //     //       properties: {},
    //     //       geometry: {
    //     //         type: 'LineString',
    //     //         coordinates: geojson
    //     //       }
    //     //     }
            
    //     //   },
    //     //   layout: {
    //     //     'line-join': 'round',
    //     //     'line-cap': 'round'
    //     //   },
    //     //   paint: {
    //     //     'line-color': '#3887be',
    //     //     'line-width': 5,
    //     //     'line-opacity': 0.75
    //     //   }
    //     // });
    //   }
    //   // add turn instructions here at the end
    // };

  }
  

}
