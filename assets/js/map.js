import { fellows } from "./fellows.js";

var map = L.map("map").setView([34.1606, 22.8515], 3.4);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: 'Map tiles by <a href="https://carto.com/attributions">Carto</a>, ' +
    'under CC BY 3.0. Data by <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, ' +
    'under ODbL',
}).addTo(map);


var LeafIcon = L.Icon.extend({
  options: {
    iconSize: [35, 35],
    popupAnchor: [0, -17],
    className: "leaflet-icon",
  },
});

fellows.forEach((fellow) => {
  var iconUrl = fellow.imagePath;
  var popupContent = `
    <div class="popup-container">
      <img class="popup-image" src="${fellow.imagePath}" alt="${fellow.fullName}">
      <div class="popup-text">
        <b>${fellow.fullName}</b>
        <p><i class="fas fa-globe"></i> ${fellow.location}</p>
        <a href='${fellow.linkedIn}'>LinkedIn</a>
      </div>
    </div>
  `;

  var popupOptions = {
    className: "custom-popup"
  };

  if (!iconUrl) {
    // Set a default icon URL if image is not provided
    iconUrl = "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png";
  }

  var fellowIcon = new LeafIcon({ iconUrl: iconUrl });

  var marker = L.marker([fellow.latitude, fellow.longitude], {
    icon: fellowIcon,
  }).addTo(map);

  marker.bindPopup(popupContent, {
    maxWidth: 300,
    className: "popup",
  });
});
