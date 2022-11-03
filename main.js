import './anim.css'
import * as Api from './Api'
import * as MapSettings from './Map'

const map = L.map('map')

Api.getNuclearPowerPlantsData()
.then(data => {
	MapSettings.initMap(map)
	MapSettings.setMap(map, data)
})