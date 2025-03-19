import modalTemplate from '../templates/modal.hbs';
import cardstemplate from '../templates/cards.hbs';
const API_KEY = 'J0g5ARVVXHxk4tqnxMbnlKhBmGVuP7cM';
const API_URL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}`;

document
  .querySelector('[data-modal-close]')
  .addEventListener('click', closeModal);
document.querySelector('.backdrop').addEventListener('click', onBackdropClick);

document.querySelector('.events__list').addEventListener('click', onEventClick);

function onEventClick(event) {
  const card = event.target.closest('.events__item');
  if (!card) return;

  const eventId = card.dataset.id;
  fetchEventData(eventId);
}

function fetchEventData(eventId) {
  fetch(
    `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${API_KEY}`
  )
    .then(response => response.json())
    .then(eventData => {
      if (eventData) {
        const eventDetails = {
          images: eventData.images,
          info: eventData.info,
          dates: eventData.dates,
          timezone: eventData.dates.timezone,
          _embedded: eventData._embedded,
          name: eventData.name,
          priceRanges: eventData.priceRanges,
          url: eventData.url,
          promoterId: eventData.promoter ? eventData.promoter.id : null,
        };
        renderModal(eventDetails);
        openModal();
      } else {
        console.error('Нічого нема');
      }
    })
    .catch(error => console.error('помивка', error));
}

function renderModal(eventData) {
  const markup = modalTemplate(eventData);
  const modalContainer = document.querySelector('.modal__main-container');
  modalContainer.innerHTML = markup;

  const moreFromAuthorBtn = modalContainer.querySelector(
    '.modal__more-info-link'
  );
  if (moreFromAuthorBtn && eventData.promoterId) {
    moreFromAuthorBtn.addEventListener('click', () =>
      fetchMoreFromAuthor(eventData.promoterId)
    );
  }
}

function fetchMoreFromAuthor(promoterId) {
  closeModal();

  fetch(`${API_URL}&promoterId=${promoterId}`)
    .then(response => response.json())
    .then(data => {
      if (data._embedded && data._embedded.events.length > 0) {
        renderAuthorEvents(data._embedded.events);
      } else {
        console.error('No events found from this author');
      }
    })
    .catch(error => console.error('Error fetching author events:', error));
}

function renderAuthorEvents(events) {
  const eventsList = document.querySelector('.events__list');
  const markup = events
    .map(event => {
      return cardstemplate({
        id: event.id,
        img: event.images[0].url,
        date: event.dates.start.localDate,
        name: event.name,
        location: event._embedded.venues[0].name,
      });
    })
    .join('');
  eventsList.innerHTML = markup;
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
