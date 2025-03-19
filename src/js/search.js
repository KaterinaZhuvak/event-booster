import countries from '../../countries.json'
import _ from 'lodash'

import cardstemplate from '../templates/cards.hbs'

const cardsList = document.querySelector(".events__list")
const dropdown = document.getElementById('js-dropdown')
const dropdownBtn = document.getElementById('js-dropdownBtn')
const inputSearch = document.getElementById('js-inputSearch')

const URL = 'https://app.ticketmaster.com/discovery/v2/events.json?'
const APIKEY = 'WuXWoDJHckwpMkp61QMSCgfgs8UYLwBG'

let currentCountry = '';
let currentKeyword = '';

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
        // Set current country code
        currentCountry = e.target.dataset.value
        
        const selectedCountry = e.target.textContent
        dropdownBtn.textContent = selectedCountry
        
        dropdown.classList.remove('is-show')
    }
}

const getEvents = async () => {
    try {
        const param = new URLSearchParams({
            apikey: APIKEY,
            size: 20 // Limit results to 20 events
        })
        
        if (currentCountry) {
            param.append('countryCode', currentCountry)
        }
        
        if (inputSearch.value) {
            param.append('keyword', inputSearch.value)
            currentKeyword = inputSearch.value
        }
        
        cardsList.innerHTML = '<li class="events__loading">Loading events...</li>'
        
        const response = await fetch(URL + param.toString())
        const data = await response.json()
        
        if (!data._embedded || !data._embedded.events || data._embedded.events.length === 0) {
            cardsList.innerHTML = `<li class="events__no-results">No events found${currentCountry ? ' in selected country' : ''}${currentKeyword ? ' matching "' + currentKeyword + '"' : ''}.</li>`
            return
        }
        
        const markup = data._embedded.events.map(event => {
            const eventparams = {
                id: event.id,
                img: event.images[0].url,
                date: event.dates.start.localDate,
                name: event.name,
                location: event._embedded.venues[0].name
            }
            return cardstemplate(eventparams)
        })
        
        cardsList.innerHTML = markup.join("")
    }
    catch (err) {
        console.log(err)
        cardsList.innerHTML = '<li class="events__error">Error loading events. Please try again.</li>'
    }
}

dropdown.addEventListener('click', (e) => {
    chooseCountry(e)
    if (currentCountry) {
        getEvents()
    }
})

inputSearch.addEventListener('input', _.throttle(() => {
    getEvents()
}, 1000))

window.addEventListener('DOMContentLoaded', () => {
    getEvents()
})