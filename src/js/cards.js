import cardstemplate from '../templates/cards.hbs'
const cardsList = document.querySelector(".events__list")
const size = 20
const btnsBlock = document.getElementById('js-btnsBlock')
let currentPage = 1 
const getCards =async()=>{
 const eventsfetch =  await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=J0g5ARVVXHxk4tqnxMbnlKhBmGVuP7cM&page=${currentPage}&size=${size}`)

 const events = await eventsfetch.json()
 return events
}
const totalPages = getCards()
console.log(getCards());
const renderEvents =async(array)=>{
    try{
        const events =  array || await getCards()
       
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
    catch(err){
        console.log(err);
        
    }
}
renderEvents()
const renderPagination = async() => {
    btnsBlock.innerHTML = ''
    const events = await getCards()
  const total = 60
  console.log(total);
  
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total|| (i >= currentPage - 1 && i <= currentPage + 3)) {
      const button = document.createElement('button')

      button.classList.add('cards__btn')
      button.dataset.page = i
      button.textContent = i
      if (i === currentPage) {
        button.disabled = true
        button.style.background = '#6d8434'
        
        button.style.color = '#e8e8e2'
      }
      if (i === total) {
        button.textContent = '...'
        
      }
      btnsBlock.appendChild(button)
    }
  }}
    renderPagination( )  
    btnsBlock.addEventListener('click', async(e) => {
      console.log(e.target);
      
      if (e.target.classList.contains('cards__btn')){
        console.log("click");
        
        currentPage = +e.target.dataset.page
        console.log(currentPage);
        
        const events =  await  getCards()
  
        renderPagination()
      renderEvents(events) 
      }
      
    
    })