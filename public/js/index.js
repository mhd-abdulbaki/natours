/*eslint-disable*/
const babel = require('@babel/polyfill');
const { login } = require('./login');
const { displayMap } = require('./mapbox');

babel();

//@DOM Element
const mapbox = document.getElementById('map');
const loginForm = document.querySelector('.form');

//@Mapbox
if (mapbox) {
  const locations = JSON.parse(mapbox.dataset.locations);
  displayMap(locations);
}

//@Login
if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    //#Values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
