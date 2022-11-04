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

const setMap = (map, data, filters = {Country: "all", Status: "all"}) => {
    let lastMarker = []

    for (let i = 0; i < data.length; i++) {
        const {Latitude, Longitude, Name, Country, Status} = data[i]

        if (Latitude != null || Longitude != null) {
            const marker = L.marker([Latitude, Longitude], {icon: powerPlantIcon})

            if (filters.Country === "all" && filters.Status === "all") {
                marker.addTo(map)
                marker.bindPopup(`Name: ${Name} <br> Country: ${Country} <br> Status: ${Status}`)
                lastMarker = [Latitude, Longitude]
            } else {
                if ((filters.Country === "all" && filters.Status === Status) ||
                    (filters.Status === "all" && filters.Country === Country) ||
                    (filters.Country === Country && filters.Status === Status)) {
                    marker.addTo(map)
                    marker.bindPopup(`Name: ${Name} <br> Country: ${Country} <br> Status: ${Status}`)
                    lastMarker = [Latitude, Longitude]
                }
            }

            if (i == data.length-1) {
                if (lastMarker.length != 0)
                map.setView(lastMarker, 13)
            }
        }
    }
}

export {powerPlantIcon, initMap, setMap}