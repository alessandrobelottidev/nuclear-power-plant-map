import iconUrl from './power-plant.png'

const powerPlantIcon = L.icon({
	iconUrl: iconUrl,

	iconSize:     [40, 40], // size of the icon
	iconAnchor:   [20, 40], // point of the icon which will correspond to marker's location
	popupAnchor:  [0, -42] // point from which the popup should open relative to the iconAnchor
})

const initMap = (map) => {
	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
	}).addTo(map)
}

const setMap = (map, data) => {
    for (let i = 0; i < data.length; i++) {
        const {Latitude, Longitude, Name, Country, Status} = data[i]

        if (Latitude != null || Longitude != null) {
            const marker = L.marker([Latitude, Longitude], {icon: powerPlantIcon})
            
            marker.addTo(map)
            marker.bindPopup(`Name: ${Name} <br> Country: ${Country} <br> Status: ${Status}`)

            if (i == data.length-1) map.setView([Latitude, Longitude], 13)
        }
    }
}

export {powerPlantIcon, initMap, setMap}