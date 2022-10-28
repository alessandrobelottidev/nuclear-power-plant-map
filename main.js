const map = L.map('map')

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map)

const powerPlantIcon = L.icon({
	iconUrl: 'power-plant.png',

	iconSize:     [40, 40], // size of the icon
	iconAnchor:   [20, 40], // point of the icon which will correspond to marker's location
	popupAnchor:  [0, -42] // point from which the popup should open relative to the iconAnchor
});

fetch('https://raw.githubusercontent.com/cristianst85/GeoNuclearData/master/data/json/denormalized/nuclear_power_plants.json')
	.then(r => r.json())
	.then(body => {
		for (let i = 0; i < body.length; i++) {
			const {Latitude, Longitude, Name, Country, Status} = body[i]

			if (Latitude != null || Longitude != null) {
				const marker = L.marker([Latitude, Longitude], {icon: powerPlantIcon}).addTo(map)
				
				marker.bindPopup(`Name: ${Name} <br> Country: ${Country} <br> Status: ${Status}`)

				if (i == body.length-1) map.setView([Latitude, Longitude], 13)
			}
		}
})