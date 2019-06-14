import React, { Component } from 'react';
import L from 'leaflet';

const dummyDataPath = [
  [36.134842046153565, -86.75954818725587],
  [36.1339408866672, -86.75899028778078],
  [36.13009351246281, -86.75499916076662],
  [36.12957358256369, -86.75461292266846]
];

export default class Map extends Component {
  map = null;

  componentDidMount() {
    // create map
    this.map = L.map('map').setView([36, -86.5], 10);

    // add basemap
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'YOUR MAPBOX API KEY'
    }).addTo(this.map);


    navigator.geolocation.getCurrentPosition(position => {
      const coords = position.coords;
      this.map.setView([coords.latitude, coords.longitude], 16);

      L.marker([coords.latitude, coords.longitude])
        .bindPopup('This is your current <strong>location</strong>')
        .addTo(this.map);
    });

    // log user clicks
    this.map.on('click', event => {
      const lat = event.latlng.lat
      const lng = event.latlng.lng;
      console.log(lat, lng);
    });

    L.polyline(dummyDataPath)
      .addTo(this.map);
  }

  render() {
    return (
      <React.Fragment>
        <div id="map"></div>
      </React.Fragment>
    )
  }
}