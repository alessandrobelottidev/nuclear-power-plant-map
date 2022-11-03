import './anim.css'
import './Navbar'
import * as Api from './Api'
import * as MapSettings from './Map'

let map = L.map('map')

MapSettings.initMap(map)

// Check if there's already data stored in localStorage before making an API call
if (localStorage.getItem('nuclearPowerPlantsData') === null) {
	Api.getNuclearPowerPlantsData()
	.then(data => {
		console.log('%c Loaded markers data from API call ', 'color: white; background-color: green')

		// Save data to localStorage as JSON
		localStorage.setItem('nuclearPowerPlantsData', JSON.stringify(data))

		// Render markers on the map
		MapSettings.setMap(map, data)
	})
} else {
	console.log('%c Loaded markers data from localStorage ', 'color: white; background-color: green')

	// Get data as JSON
	const data = JSON.parse(localStorage.getItem('nuclearPowerPlantsData'))

	// Render markers on the map
	MapSettings.setMap(map, data)
}


// NAVBAR
const refreshBtn = document.getElementById('refreshBtn')
const refreshIcon = document.getElementById('refreshIcon')

refreshBtn.addEventListener('click', () => {
    if (!refreshIcon.classList.contains('rotate-icon')) {
        refreshIcon.classList.add('rotate-icon')

        // Make call to API to update the data present in LocalStorage, then update the map view
        Api.getNuclearPowerPlantsData()
        .then(data => {
            map.remove()

			map = L.map('map')

            MapSettings.initMap(map)

            console.log('%c Map was refreshed and the markers in localStorage updated ', 'color: white; background-color: green')

            // Save data to localStorage as JSON
            localStorage.setItem('nuclearPowerPlantsData', JSON.stringify(data))

            // Render markers on the map
            MapSettings.setMap(map, data)
        })
    }

    setTimeout(() => {
        refreshIcon.classList.remove('rotate-icon')
    }, 1000)
})
