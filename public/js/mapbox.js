/*eslint-disable*/
const locations = JSON.parse(document.getElementById('map').dataset.locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoiaHVtYW01NiIsImEiOiJjbG8wYmo4eGIwY3ZhMmpwajA3OTFxcXBrIn0.xCOGqyt8aheWyXwN3yAgyA';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/humam56/clo0cmmzb00ab01p6a2bog26m',
  scrollZoom: false
  // center: [-106.516623, 39.60499],
  // zoom:4,
  // interactive: false
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
  //Add marker
  const el = document.createElement('div');
  el.className = 'marker';

  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  //Add Popup
  new mapboxgl.Popup({ offset: 30 })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 100,
    bottom: 100,
    left: 150,
    right: 150
  }
});
