import handleSelector from './selector.js';
import clickSort from './sortTable.js';

const URL_API = 'https://coronavirus-19-api.herokuapp.com/';
const tbody = document.querySelector('tbody');
const countriesSelector = document.querySelector('.countries-selector');

function start() {
	showResultsGlobal();
	showResultsContries();
	handleSelector();
	clickSort();
	handlesSelectorDat();
}
start();

function formatNumber(number) {
	if (typeof number === 'number') {
		return number.toLocaleString('us-US');
	}
	return '...';
}

/* Handle data of global */
async function getGlobalData() {
	const result = await fetch(`${URL_API}all`).then(res => res.json());
	return result;
}

async function showResultsGlobal() {
	const globalData = await getGlobalData();
	const globalCard = document.querySelector('.global-block');
	let htmls = `
			<div class="global-card">
				<span>Global</span>
				<h3>Coronavirus cases</h3>
				<span>${formatNumber(globalData.cases)}</span>
			</div>
			<div class="global-card">
				<span>Global</span>
				<h3>Deaths</h3>
				<span>${formatNumber(globalData.recovered)}</span>
			</div>
			<div class="global-card">
				<span>Global</span>
				<h3>Recovered</h3>
				<span>${formatNumber(globalData.deaths)}</span>
			</div>
			`;
	globalCard.innerHTML = htmls;
}


/* Handle data of countries */
async function getCountriesData() {
	const results = await fetch(`${URL_API}countries`).then(res => res.json());
	return results;
}

async function showResultsContries() {
	const countriesData = await getCountriesData();
	let htmls = '';
	let html = '<li class="country">All Country</li>';
	const countriesArray = [];

	countriesData.forEach(countryData => {
		countriesArray.push(countryData.country);

		htmls += `
						<tr>
						<td></td>
						<td>${countryData.country}</td>
						<td>${formatNumber(countryData.cases)}</td>
						<td>${formatNumber(countryData.todayCases)}</td>
						<td>${formatNumber(countryData.deaths)}</td>
						<td>${formatNumber(countryData.todayDeaths)}</td>
						<td>${formatNumber(countryData.recovered)}</td>
						<td>${formatNumber(countryData.active)}</td>
						</tr>
						`;
	})

	countriesArray.sort().forEach(country => {
		html += `
			<li class="country">${country}</li>`;
	});

	tbody.innerHTML = htmls;
	countriesSelector.innerHTML = html;
}

/* Handle data of selector */
function handlesSelectorDat() {
	countriesSelector.addEventListener('click', (e) => {
		const countriesSelectorBtn = document.querySelector('.countries-selector-btn');
		let countryName = '';

		if (e.target.className === 'country') {
			e.target.textContent !== 'All Country' ? countryName = e.target.textContent : countryName;
			countriesSelectorBtn.innerHTML = `${e.target.textContent} <span>&#9660;</span>`;
		}

		async function getSelectorData() {
			const result = await fetch(`${URL_API}countries/${countryName}`).then(res => res.json());
			return result;
		}

		async function showResultsSelector() {
			const selectorData = await getSelectorData();
			let htmls = '';
			if (Array.isArray(selectorData)) {
				selectorData.forEach(result => {
					htmls += `
						<tr>
							<td></td>
							<td>${result.country}</td>
							<td>${formatNumber(result.cases)}</td>
							<td>${formatNumber(result.todayCases)}</td>
							<td>${formatNumber(result.deaths)}</td>
							<td>${formatNumber(result.todayDeaths)}</td>
							<td>${formatNumber(result.recovered)}</td>
							<td>${formatNumber(result.active)}</td>
						</tr>
						`;
				})
			} else {
				htmls += `
					<tr>
						<td></td>
						<td>${selectorData.country}</td>
						<td>${formatNumber(selectorData.cases)}</td>
						<td>${formatNumber(selectorData.todayCases)}</td>
						<td>${formatNumber(selectorData.deaths)}</td>
						<td>${formatNumber(selectorData.todayDeaths)}</td>
						<td>${formatNumber(selectorData.recovered)}</td>
						<td>${formatNumber(selectorData.active)}</td>
					</tr>
					`;
			}
			tbody.innerHTML = '';
			tbody.innerHTML += htmls;
		}
		showResultsSelector();
	});
}





