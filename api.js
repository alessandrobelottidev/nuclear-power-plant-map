const url = 'https://raw.githubusercontent.com/cristianst85/GeoNuclearData/master/data/json/denormalized/nuclear_power_plants.json';

async function getNuclearPowerPlantsData() {
    const arr = []

    await fetch(url)
	.then(r => r.json())
	.then(body => {
        for (let i = 0; i < body.length; i++) {
			const {Latitude, Longitude, Name, Country, Status} = body[i]

			if (Latitude != null || Longitude != null)
				arr.push({Latitude, Longitude, Name, Country, Status})
		}
    })

    return arr
}

export {getNuclearPowerPlantsData}