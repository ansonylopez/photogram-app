import { Component, Input, OnInit, ViewChild } from '@angular/core';

declare var mapboxgl: any;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  @Input() coords: string;
  @ViewChild('mapElement', { static: true }) mapElement;

  constructor() { }

  ngOnInit() {

    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);


    mapboxgl.accessToken = 'pk.eyJ1IjoiYW5zb255IiwiYSI6ImNrc2puMWR4YjJlem8ydm52cnA1bmdpMnQifQ.g2SzyPQ14PMAVdbA5iN5yw';
    const mapToShow = new mapboxgl.Map({
      container: this.mapElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ lng, lat ],
      zoom: 15
    });

    const marker = new mapboxgl.Marker().setLngLat( [ lng, lat ] ).addTo( mapToShow );

  }

}
