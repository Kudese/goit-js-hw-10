import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
const elInputFild = document.querySelector('[id="search-box"]');
elInputFild.addEventListener('input', searchCountri);

function searchCountri(e) {
 console.log(fetchCountries(e.target.value))
  
}
