
const dropdown = document.getElementById('js-dropdown')

const dropdownWrapper = document.getElementById('js-dropdownWrapper')

dropdownWrapper.addEventListener('click', () => {
    dropdown.classList.toggle('is-show')
})