import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import Notiflix, { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

const elInputFild = document.querySelector('[id="search-box"]');
const elListCountri = document.querySelector('.country-list');
const elCountriInfo = document.querySelector('.country-info');

elInputFild.addEventListener('input', debounce(checkCountri, DEBOUNCE_DELAY));

function checkCountri(e) {
  e.preventDefault();
  if (e.target.value.trim() == '') {
    elCountriInfo.innerHTML = '';
    elListCountri.innerHTML = '';
    return;
  }
  fetchCountries(e.target.value.trim())
    .then(data => {
      if (data.length > 10) {
        elListCountri.innerHTML = '';
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length <= 10 && data.length > 1) {
        elCountriInfo.innerHTML = '';
        elListCountri.innerHTML = '';
        createListCountry(data);
      } else {
        elCountriInfo.innerHTML = '';
        elListCountri.innerHTML = '';
        wathCuontri(data);
      }
    })
    .catch(() => {
      elCountriInfo.innerHTML = '';
      elListCountri.innerHTML = '';
      return;
    });
}

function createListCountry(countri) {
  console.log(countri);
  elCountriInfo.innerHTML = '';
  let onHTMllist = '';
  onHTMllist += countri
    .map(item => {
      return `<li class="country-list__item"><img class="country-list__flags"  src=${item.flags.svg} alt="${item.name.common}">${item.name.common}</li>`;
    })
    .join('');
  elListCountri.innerHTML = onHTMllist;
}
function wathCuontri(countri) {
  elCountriInfo.innerHTML = '';
  console.log(countri);
  let languages = Object.values(countri[0].languages);
  console.log(languages);
  let onHTMLInfo = `<div class="country-info__container"><img class="country-info__flag" src=${countri[0].flags.svg} alt="${countri[0].name.common}"><span class="country-info__title" >${countri[0].name.official}</span></div>
 <div><span class="country-info__text">Capital:</span>${countri[0].capital}</div>
 <div><span class="country-info__text">Population:</span>${countri[0].population}</div>
 <div><span class="country-info__text">Languages:</span>${languages}</div>`;
  console.log(onHTMLInfo);
  elCountriInfo.innerHTML = onHTMLInfo;
}

