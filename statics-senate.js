// API KEY xyIXQJFsjHy2gTDbB2wjkoIzVS0mWHscNHkindLs

const inputElements = document.getElementsByClassName("form-check");

var array;
//"Access-Control-Allow-Origin: "

fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
	method: "GET",
	headers: {
		"X-API-Key": `xgcjmvEPRCLkUdtiMETXRdFrRZ6H9E6SVh3tNsaY `
	}
})
	.then(function(response) {
		//if (response.ok) {
		console.log("soy response", response);

		return response.json();
		//}
		//throw new Error(response.statusText);
	})
	.then(function(json) {
		// do somenthing with json data
		console.log("soy data del fetch", json);
		members = json.results[0].members;
		console.log("members ok", members);
		//FilterData();
		//dropDownStates();
		//evenListener();

		//createDataTable(members);

		// LLAMAR FUNCIONES QUE EJECUTAN DATOS FILTROS, CREAR TABLA ...
		// SI CREO UNA FUNCION DENTRO DE OTRA FUNCION LA PUEDO LLAMAR DE FUERA? CREO QUE EL SCOPE VA COMO LAS VARIABLES DE DENTRO HACIA AFUERA
	});
//.catch(function(error) {
// called when an error occurs anywhere in the chain
// console.log("Request failed: " + error.message);
//})

const tbodyTotal = document.getElementById("senatorsStats");
const arraymembers = data.results[0].members;

/* Values we need to check arraymembers.votes_with_party_pct, votes_against_party_pct,  party url total_votes ... 
average = (votes_with_party_pct / total_votes) */

statistics = {
	dem: 0,
	rep: 0,
	ind: 0,
	totalvotewithd: 0,
	totalvotewithr: 0,
	totalvotewithi: 0,
	averagede: 0,
	averagere: 0,
	averagein: 0,
	averageTotal: 0,
	totalmissedvotes: 0,
	TotalParty: arraymembers.length,
	totalmiss10xcent: 0
};
function FillStats(array) {
	for (i = 0; i < arraymembers.length; i++) {
		var createCell = document.createElement("td");

		//statistics.dem = +1 && statistics.Tvotewithde +=  arraymemebers.votes_with_party_pct
		switch (true) {
			case arraymembers[i].party == "R":
				statistics.rep++;
				statistics.totalvotewithr =
					statistics.totalvotewithr + arraymembers[i].votes_with_party_pct;

				// Getting total miss votes to calculate botton 10%
				// statistics.totalmissedvotes += arraymembers[i].missed_votes;

				break;

			case arraymembers[i].party == "D":
				statistics.dem++;
				//	other way to sumatory +=
				statistics.totalvotewithd += arraymembers[i].votes_with_party_pct;

				statistics.totalmissedvotes += arraymembers[i].missed_votes;

				break;

			case arraymembers[i].party == "I":
				statistics.ind++;
				statistics.totalvotewithi += arraymembers[i].votes_with_party_pct;
				statistics.totalmissedvotes += arraymembers[i].missed_votes;

				break;
		}
	}

	// Calculate average
	statistics.averagere = (statistics.totalvotewithr / statistics.rep).toFixed(
		2
	);
	statistics.averagede = (statistics.totalvotewithd / statistics.dem).toFixed(
		2
	);
	statistics.averagein = (statistics.totalvotewithi / statistics.ind).toFixed(
		2
	);
	statistics.averageTotal =
		(statistics.averagere + statistics.averagede + statistics.averagein) / 3;
}
FillStats(arraymembers);

// Calculating botton 10%
statistics.totalmiss10xcent = statistics.totalmissedvotes / 10;

// SECOND TABLES

// name
// missed_votes_pct
// missed_votes

const senatormissvotes = ["name", "missed_votes", "missed_votes_pct"];

/* FUNCIONANDO 
function bottomstatics(array) {
	// Order the function
	arraymembers.sort(function(a, b) {
		return b.missed_votes_pct - a.missed_votes_pct;
	});
	const tbody = document.getElementById("senatorsBottomEngaged");

	let bottomtenpercent = Math.round(array.length * 0.1);
	
	let realtenpercent = array[bottomtenpercent].missed_votes_pct;
	// After order the function get the 10% bottom

	for (i = 0; i < bottomtenpercent; i++) {
		var createRow = document.createElement("tr");

		for (j = 0; j < senatormissvotes.length; j++) {
			var createCell = document.createElement("td");

			//	Writting data and Full Name
			if (j == 0 && array[i].middle_name == null) {
				createCell.innerHTML = (
					array[i].first_name +
					" " +
					array[i].last_name
				).link(array[i].url);
			} else if (j == 0) {
				createCell.innerHTML = (
					array[i].first_name +
					" " +
					array[i].middle_name +
					" " +
					array[i].last_name
				).link(array[i].url);
			} else {
				createCell.innerHTML = array[i][senatormissvotes[j]];
			}

			createRow.appendChild(createCell);
		}
		tbody.appendChild(createRow);
	}
}



bottomstatics(arraymembers);
FIN FUNCIOANDO BOTTOM */

function bottomstatics(array) {
	// Order the function
	var sortedArray = Array.from(array);
	sortedArray.sort(function(a, b) {
		return b.missed_votes_pct - a.missed_votes_pct;
	});
	const tbodyb = document.getElementById("senatorsBottomEngaged");

	// After order the function get the 10% bottom

	let bottomtenpercent = Math.round(sortedArray.length * 0.1);
	let realtenpercent = sortedArray[bottomtenpercent - 1].missed_votes_pct;

	for (i = 0; i < sortedArray.length; i++)
		if (sortedArray[i].missed_votes_pct >= realtenpercent) {
			{
				var createRow = document.createElement("tr");

				for (j = 0; j < senatormissvotes.length; j++) {
					var createCell = document.createElement("td");

					//	Writting data and Full Name
					if (j == 0 && sortedArray[i].middle_name == null) {
						createCell.innerHTML = (
							sortedArray[i].first_name +
							" " +
							sortedArray[i].last_name
						).link(sortedArray[i].url);
					} else if (j == 0) {
						createCell.innerHTML = (
							sortedArray[i].first_name +
							" " +
							sortedArray[i].middle_name +
							" " +
							sortedArray[i].last_name
						).link(sortedArray[i].url);
					} else {
						createCell.innerHTML = sortedArray[i][senatormissvotes[j]];
					}

					createRow.appendChild(createCell);
				}
				tbodyb.appendChild(createRow);
			}
		} else {
			//para que la funcion pare sin llegar a recorrer el array hasta el final cuando la condicion no se cumpla
			break;
		}
}

bottomstatics(arraymembers);

function Topstaticsatendance(array) {
	// Order the function
	array.sort(function(a, b) {
		return b.missed_votes_pct - a.missed_votes_pct;
	});
	const tbodyt = document.getElementById("senatorsTopEngaged");

	// After order the function get the 10% TOp

	let Toptenpercent = array.length - Math.round(array.length * 0.1);

	let realtenpercent = array[Toptenpercent].missed_votes_pct;

	for (i = Toptenpercent; i < array.length; i++) {
		var createRow = document.createElement("tr");

		for (j = 0; j < senatormissvotes.length; j++) {
			var createCell = document.createElement("td");

			//	Writting data and Full Name, adding link url
			// window.open() Consultar
			if (j == 0 && array[i].middle_name == null) {
				createCell.innerHTML = (
					array[i].first_name +
					" " +
					array[i].last_name
				).link(array[i].url);
			} else if (j == 0) {
				createCell.innerHTML = (
					array[i].first_name +
					" " +
					array[i].middle_name +
					" " +
					array[i].last_name
				).link(arraymembers[i].url);
			} else {
				createCell.innerHTML = array[i][senatormissvotes[j]];
			}

			createRow.appendChild(createCell);
		}
		tbodyt.appendChild(createRow);
	}
}

Topstaticsatendance(arraymembers);

// hacer una funcion que calcule el funcion array(asc) true o false, if asc  array.sort(function(a, b) si es dsc
// { return b.missed_votes_pct - a.missed_votes_pct; else al reves sort b-a

// hacer una funcion que haga el crear tabla, creatabla(id,array)
