import handleSelector from './selector.js';
import sortTable from './sortTable.js';

const URL_API = 'https://coronavirus-19-api.herokuapp.com/';
const tbody = document.querySelector('tbody');
const globalCard = document.querySelector('.global-block');
const countriesSelector = document.querySelector('.countries-selector');
const countriesSelectorBtn = document.querySelector('.countries-selector-btn');

function formatNumber(number) {
  if (typeof number === 'number') {
    return number.toLocaleString('us-US');
  }
  return '...';
}

/* Handle data of global */
fetch(`${URL_API}all`)
  .then(res => res.json())
  .then(result => showResultsGlobal(result));

function showResultsGlobal(result) {
  let htmls = '';
  htmls +=`
          <div class="global-card">
          <span>Global</span>
          <h3>Coronavirus cases</h3>
          <span>${formatNumber(result.cases)}</span>
          </div>
          <div class="global-card">
          <span>Global</span>
          <h3>Deaths</h3>
          <span>${formatNumber(result.recovered)}</span>
          </div>
          <div class="global-card">
          <span>Global</span>
          <h3>Recovered</h3>
          <span>${formatNumber(result.deaths)}</span>
          </div>
          `;
  globalCard.innerHTML += htmls;
}


/* Handle data of countries */
fetch(`${URL_API}countries`)
  .then(res => res.json())
  .then(result => showResultsContries(result));

function showResultsContries(results) {
  let htmls = '';
  let html = '';
  const countriesArray = [];

  results.forEach(result => {
    countriesArray.push(result.country)
    
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

  countriesArray.sort().forEach(country => {
    html += `<li class="country">${country}</li>`;
  });

  tbody.innerHTML += htmls;
  countriesSelector.innerHTML += html;

}

/* Handle data of selector */
countriesSelector.addEventListener('click', (e) => {
  let countryName = '';
  if (e.target.className === 'country') {
    e.target.textContent !== 'All Country' ? countryName = e.target.textContent : countryName;
    countriesSelectorBtn.innerHTML = `${e.target.textContent} <span>&#9660;</span>`;
  }

  fetch(`${URL_API}countries/${countryName}`)
    .then(res => res.json())
    .then(result => showResultsSelector(result));
})

function showResultsSelector(results) {
  let htmls = '';
  if (Array.isArray(results)) {
    results.forEach(result => {
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
            <td>${results.country}</td>
            <td>${formatNumber(results.cases)}</td>
            <td>${formatNumber(results.todayCases)}</td>
            <td>${formatNumber(results.deaths)}</td>
            <td>${formatNumber(results.todayDeaths)}</td>
            <td>${formatNumber(results.recovered)}</td>
            <td>${formatNumber(results.active)}</td>
            </tr>
            `;
  }
  tbody.innerHTML = '';
  tbody.innerHTML += htmls;
}

