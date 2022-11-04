import './anim.css'
import './Navbar'
import * as Api from './Api'
import * as MapSettings from './Map'


// Filters
const initFiltersSelectOptions = (data) => {
    const countrySelect = document.getElementById('countrySelect')
    const statusSelect = document.getElementById('statusSelect')

    let countries = []
    let statusTypes = []

    // Crea la lista delle nazioni in base a dataArr
    for(let i = 0; i < dataArr.length; i++) {
        if (!countries.includes(dataArr[i].Country))
            countries.push(dataArr[i].Country)

        if (!statusTypes.includes(dataArr[i].Status))
            statusTypes.push(dataArr[i].Status)
    }

    // Aggiorna la vista del select country
    for(let i = 0; i < countries.length; i++) {
        const opt = document.createElement('option');
        opt.value = countries[i];
        opt.innerHTML = countries[i];
        countrySelect.appendChild(opt);
    }

    // Aggiorna la vista del select status
    for(let i = 0; i < statusTypes.length; i++) {
        const opt = document.createElement('option');
        opt.value = statusTypes[i];
        opt.innerHTML = statusTypes[i];
        statusSelect.appendChild(opt);
    }
}

let map = L.map('map')

MapSettings.initMap(map)

let dataArr

// Check if there's already data stored in localStorage before making an API call
if (localStorage.getItem('nuclearPowerPlantsData') === null) {
	Api.getNuclearPowerPlantsData()
	.then(data => {
		console.log('%c Loaded markers data from API call ', 'color: white; background-color: green')

        dataArr = data

		// Save data to localStorage as JSON
		localStorage.setItem('nuclearPowerPlantsData', JSON.stringify(data))

		// Render markers on the map
		MapSettings.setMap(map, data)

        initFiltersSelectOptions(dataArr)
	})
} else {
	console.log('%c Loaded markers data from localStorage ', 'color: white; background-color: green')

	// Get data as JSON
	dataArr = JSON.parse(localStorage.getItem('nuclearPowerPlantsData'))

	// Render markers on the map
	MapSettings.setMap(map, dataArr)

    initFiltersSelectOptions(dataArr)
}


// NAVBAR
// Refresh
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

            dataArr = data

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

// Filters
const applyFiltersBtn = document.getElementById('applyFiltersBtn')

applyFiltersBtn.addEventListener('click', () => {
    const countrySelect = document.getElementById('countrySelect')
    const statusSelect = document.getElementById('statusSelect')

    map.remove()
    map = L.map('map')

    MapSettings.initMap(map)

    // Render markers on the map
    MapSettings.setMap(map, dataArr, {Country: countrySelect.value, Status: statusSelect.value})
})

// Settings
