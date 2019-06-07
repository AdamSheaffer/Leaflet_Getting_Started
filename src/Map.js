import React, { Component } from 'react';
import L from 'leaflet';

export default class Map extends Component {

  goToCurrentLocation = () => {
    if (!this.map) return;

    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      this.map.setView([lat, lon], 16);

      // add a marker to my location
      L.marker([lat, lon])
        .bindPopup('This is your current <strong>Location</strong>')
        .addTo(this.map);
    }, err => {
      console.log(err);
    });

    // draw a polyline
    L.polyline([
      [36.13427, -86.759205],
      [36.130111, -86.754999],
      [36.125431, -86.752424]
    ]).addTo(this.map);
  }

  componentDidMount() {
    // create map
    this.map = L.map('map')
      .setView([36.2, -86.8], 14)

    // add tiles to map
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoiYWRhbXNoZWFmZmVyIiwiYSI6ImNqa2s1OWRieDA4emYzdnBiZnF1ZmU1b3AifQ.W6pXH3av-6y3UzRO8dAIMg'
    }).addTo(this.map);

    // track where user clicks
    this.map.on('click', e => {
      console.log(`clicked on  ${e.latlng}`);
    });
  }

  render() {
    return (
      <React.Fragment>
        <div id="map"></div>
        <button onClick={this.goToCurrentLocation}>Go to current location</button>
      </React.Fragment>
    )
  }
}