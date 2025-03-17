import modalTemplate from '../tamplates/modal.hbs';
const API_KEY = 'J0g5ARVVXHxk4tqnxMbnlKhBmGVuP7cM';
const API_URL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}`;

document
  .querySelector('[data-modal-open]')
  .addEventListener('click', fetchEventData);
document
  .querySelector('[data-modal-close]')
  .addEventListener('click', closeModal);
document.querySelector('.backdrop').addEventListener('click', onBackdropClick);

function fetchEventData() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      if (data._embedded && data._embedded.events.length > 0) {
        const eventData = data._embedded.events[1];
        const eventDetails = {
          images: eventData.images,
          info: eventData.info,
          dates: eventData.dates,
          timezone: eventData.dates.timezone,
          _embedded: eventData._embedded,
          name: eventData.name,
          priceRanges: eventData.priceRanges,
          url: eventData.url,
        };
        renderModal(eventDetails);
        openModal();
      } else {
        console.error('нічего нема');
      }
    })
    .catch(error => console.error('помивка:', error));
}

function renderModal(eventData) {
  const markup = modalTemplate(eventData);
  document.querySelector('.modal__main-container').innerHTML = markup;
}

function openModal() {
  document.querySelector('.backdrop').classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.querySelector('.backdrop').classList.add('is-hidden');
  document.body.style.overflow = '';
}

function onBackdropClick(event) {
  if (event.target === document.querySelector('.backdrop')) {
    closeModal();
  }
}
