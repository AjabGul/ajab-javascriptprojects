//  step 1: fetch data from Rapid API
// https://rapidapi.com/slotixsro-slotixsro-default/api/covid-19-tracking?endpoint=apiendpoint_7d5ee8f3-b6ad-49db-a824-baaad42d87c0

fetch("https://covid-19-tracking.p.rapidapi.com/v1/Pakistan", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "0b9ad5bc46msh5a823af9c92fffdp187bd0jsn551fcd1c0191",
		"x-rapidapi-host": "covid-19-tracking.p.rapidapi.com"
	}
})
	.then(response => {
		// console.log(response);
		return response.json();
	})
	.then(dataSet => {
		const data = dataSet;
		// console.log(data);

		// step 2: store data in variables 
		const actvieCases = data['Active Cases_text'].replace(/\,/g, '');
		const country = data['Country_text'];
		const lastUpdate = data['Last Update'].replace(/\,/g, '');
		const newCases = data["New Cases_text"].replace(/\,/g, '');
		const newDeaths = data["New Deaths_text"].replace(/\,/g, '');
		const totalCases = data["Total Cases_text"].replace(/\,/g, '');
		const totalDeaths = data["Total Deaths_text"].replace(/\,/g, '');
		const totalRecovered = data["Total Recovered_text"].replace(/\,/g, '');

		const reports = [];

		// console.log(reports);

		function createArray() {
			reports.push(totalCases);
			reports.push(totalRecovered);
			reports.push(totalDeaths);
			reports.push(actvieCases);
			reports.push(newCases);
			reports.push(newDeaths);
		}

		createArray();

		// step 3: add the data to UI 
		document.getElementById('pak').innerHTML = `Country: <br/>${country}`;
		document.getElementById('total_cases').innerHTML = `Total Cases: <br/> ${totalCases}`;
		document.getElementById('total_recovred').innerHTML = `Total Recovered:<br/> ${totalRecovered}`;
		document.getElementById('total_deaths').innerHTML = `Total Deaths:<br/> ${totalDeaths}`;
		document.getElementById('active_cases').innerHTML = `Active Cases: <br/>${actvieCases}`;
		document.getElementById('new_cases').innerHTML = `New Cases: <br/>${newCases}`;
		document.getElementById('new_deaths').innerHTML = `New Death:<br/> ${newDeaths}`;
		document.getElementById('last_update').innerHTML = `Last Update: <br/>${lastUpdate}`;


		const ctx = document.getElementById('lineChart').getContext('2d');
		const myChart = new Chart(ctx, {
			type: "line",
			data: {
				labels: ["Total Cases", " Total Recovered", "Total Deaths", "Active Cases", "New Cases", "New Deaths"],
				datasets: [
					{
						data: reports,
						label: "Pakistan Covid-19 Updated",
						backgroundColor: ["yellow", "green", "red", "orange", "pink", "red"],
						borderColor: "pink",
						fill: false,
						borderWidth: 1,
					},

				],
			},

			options: {
				responsive: true,
				layout: {
					padding: {
						left: 50,
						right: 50,
					}
				},
				animation: {
					duration: 5000,
					easing: "easeInOutBounce",
				}
			}
		});

	});


const togglebtn = document.getElementById('togglebtn');
const navbarLinks = document.getElementById('navbar-links');


togglebtn.addEventListener('click', () => {
	navbarLinks.classList.toggle('active')
});