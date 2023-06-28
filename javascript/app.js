'use strict';
let API_KEY = 'at_CKjxJBnJz5gqlSpUnzROKYj3cG1jW'
const userIP = document.querySelector(".ip-info");
const userLocation = document.querySelector(".location-info");
const userTimezone = document.querySelector(".timezone-info");
const userServiceName = document.querySelector(".isp-info");
const submitBtn = document.querySelector('.submit-btn')
const resultCont = document.querySelector('.result-cont')
let myMap;
let marker;

resultCont.style.display = 'none'

const initMap = (lat, lng) => {
    if (myMap) {
        myMap.remove(); // Remove the existing map if it already exists
    }
    myMap = L.map('map').setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(myMap);


    resultCont.style.display = 'flex'


}

const addMarker = (lat, lng) => {
    if (marker) {
        myMap.removeLayer(marker); // Remove the existing marker if it already exists
    }
    marker = L.marker([lat, lng]).addTo(myMap);
}

const fetchGeoLocation = () => {
    const ip = document.querySelector('.input-id').value;

    fetch(`https://geo.ipify.org/api/v1?apiKey=${API_KEY}&ipAddress=${ip}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        })
        .then(data => {
            userIP.textContent = data.ip;
            userLocation.textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
            userTimezone.textContent = `UTC ${data.location.timezone}`;
            userServiceName.textContent = data.isp;

            let lat = data.location.lat;
            let lng = data.location.lng;
            initMap(lat, lng);
            addMarker(lat, lng); // Add the marker to the map
        })
        .catch(error => {
            console.log(error);
        });
}

submitBtn.addEventListener('click', fetchGeoLocation);

document.addEventListener('keydown', function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        submitBtn.click();
    }
});