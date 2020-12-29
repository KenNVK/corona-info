const countriesSelectorWrap = document.querySelector('.countries-selector-wrap');
const countriesSelectorBtn = document.querySelector('.countries-selector-btn');
const countriesSelectorInput = document.querySelector('.countries-selector-input');

function handleSelector() {

	// Handle hide/show selector
	countriesSelectorBtn.addEventListener('click', () => {
		countriesSelectorWrap.classList.toggle('countries-selector-hide');
		countriesSelectorInput.focus();
	});

	document.addEventListener('click', function (e) {
		const isBtnInside = countriesSelectorBtn.contains(e.target);
		const isInputside = countriesSelectorInput.contains(e.target);
		if (!isBtnInside && !isInputside) {
			countriesSelectorWrap.classList.add('countries-selector-hide')
		}
	});

	/* Search filter country */
	countriesSelectorInput.addEventListener('keyup', (e) => {
		const countryList = document.querySelectorAll('li');
		const searchItem = e.target.value.toLowerCase();

		countryList.forEach(country => {
			if (country.textContent.toLowerCase().includes(searchItem)) {
				country.closest('li').style.display = "block"
			}
			else {
				country.closest('li').style.display = "none";
			}
		});
	});
}

export default handleSelector;


