import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(e) {
  refs.countryInfo.innerHTML = '';

  const country = e.target.value.trim();
  if (country) {
    fetchCountries(country).then(showCountriesData).catch(errorFoo);
  }
}

function showCountriesData(countryData) {
  if (countryData.length > 10) {
    refs.countryInfo.innerHTML = '';
    Notify.info('Too many matches found. Please enter a more specific name.', {
      position: 'center-top',
    });
    return;
  }

  if (countryData.length === 1) {
    renderOneCountry(countryData);
    return;
  }

  renderSomeCountry(countryData);
}

function renderOneCountry([{ flags, name, capital, population, languages }]) {
  const template = `
      <div class='main-info'>
         <img src="${flags.svg}"
              alt="Flag of Ukraine"
              class="country-flag"
              width="40px"
      />
         <h1 class="country-name">${name.common}</h1>
      </div>
      
      <p><b>Capital: </b>${capital}</p>
      <p><b>Population: </b>${population}</p>
      <p><b>Languages: </b>${Object.values(languages).join(', ')}</p>`;

  console.log(template);

  refs.countryInfo.innerHTML = template;
}

function renderSomeCountry(countries) {
  const template = countries
    .map(({ flags, name }) => {
      return `<li class="country-list_item">
        <img src="${flags.svg}"
          alt="Flag of ${name}"
          class="country-flag"
          width="30px"/>
          <p class="country-name">${name.common}</p>
              </li>`;
    })
    .join('');

  console.log(template);

  refs.countryInfo.innerHTML = template;
}

function errorFoo() {
  (refs.countryInfo.innerHTML = ''),
    Notify.failure('Oops, there is no country with that name', {
      position: 'center-top',
    });
}
