import './anim.css'
import * as Api from './Api'
import * as MapSettings from './Map'

const map = L.map('map')

MapSettings.initMap(map)

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