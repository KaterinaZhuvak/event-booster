import countries from '../../countries.json'
import _ from 'lodash'

import cardstemplate from '../templates/cards.hbs'


const cardsList = document.querySelector(".events__list")


const dropdown = document.getElementById('js-dropdown')
const inputSearch = document.getElementById('js-inputSearch')

const URL = 'https://app.ticketmaster.com/discovery/v2/events.json?'
const APIKEY = 'WuXWoDJHckwpMkp61QMSCgfgs8UYLwBG'

let currentCountry;

console.log(countries);

const renderCountries = () => {
    countries.map(country => {
        const option = document.createElement('span')
        option.classList.add('search__country')
        option.dataset.value = country.countryCode
        option.textContent = country.country
        dropdown.appendChild(option) 
    })
    
}

renderCountries()


const chooseCountry = (e) => {
    if(e.target.closest('.search__country')) {
        currentCountry = e.target.dataset.value
        // console.log(currentCountry)
    }
    // console.log(e.target);
    
}






const getCardsByCountry = async () => {
    console.log(currentCountry);

    // chooseCountry(e)
      const param = new URLSearchParams({
        apikey: APIKEY,
        countryCode: currentCountry || ''
        // keyword: inputSearch.value || ''

        })

    try {
        const response = await fetch(URL + param.toString())
        const posts = await response.json()
        console.log(posts);

        const events = posts
               
        const markup =  events._embedded.events.map(event => {
            const eventparams = {
            id: event.id,
            img:event.images[0].url,
            date:event.dates.start.localDate,
            name:event.name,
            location:event._embedded.venues[0].name
            }
            return cardstemplate(eventparams)
        })
                
        cardsList.innerHTML = markup.join("")
        
    }
    catch (err) {
        console.log(err)
    }
    
}


const getCardsByKeyword = async () => {
    console.log(currentCountry);

    // chooseCountry(e)
      const param = new URLSearchParams({
        apikey: APIKEY,

        keyword: inputSearch.value || ''

        })

    try {
        const response = await fetch(URL + param.toString())
        const posts = await response.json()
        console.log(posts);


        const events =  posts
               
        const markup =  events._embedded.events.map(event => {
            const eventparams = {
            id: event.id,
            img:event.images[0].url,
            date:event.dates.start.localDate,
            name:event.name,
            location:event._embedded.venues[0].name
            }
            return cardstemplate(eventparams)
        })
                
        cardsList.innerHTML = markup.join("")
        
    }
    catch (err) {
        console.log(err)
    }
    
}


dropdown.addEventListener('click', (e) => {
    chooseCountry(e)
    getCardsByCountry()

    console.log(currentCountry)

})

inputSearch.addEventListener('input', _.throttle(() => {
    getCardsByKeyword()

}, 1000))