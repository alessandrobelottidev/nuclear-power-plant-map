import './anim.css'
import * as api from './api'
import * as mapSettings from './map'

const map = L.map('map')

api.getNuclearPowerPlantsData()
.then(data => {
	mapSettings.initMap(map)
	mapSettings.setMap(map, data)
})