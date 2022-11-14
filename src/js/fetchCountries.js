export default function fetchCountries(name) {
    fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then((response)=> {
      return  response.json()
    } )
    .then((data)=>{  const [name, capital,population,flags,languages]= data
     return name, capital,population,flags,languages})


