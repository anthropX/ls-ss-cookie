// import _ from 'lodash';

const inputNode = document.querySelector('#input')
const cookieNode = document.querySelector('.cookie')
const lsNode = document.querySelector('.ls')
const ssNode = document.querySelector('.ss')

const getCookie = (name) => {
  var nameEQ = name + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) == ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

const updateDomNodes = () => {
  lsNode.innerHTML = localStorage.getItem('userInput') || ''
  ssNode.innerHTML = sessionStorage.getItem('userInput') || ''
  cookieNode.innerHTML = getCookie('userInput') || ''
}

// display browser storage on refresh
updateDomNodes()

let userInput
const storeInBrowserStorages = () => {
  localStorage.setItem('userInput', userInput)
  sessionStorage.setItem('userInput', userInput)
  document.cookie = `userInput=${userInput}`
  updateDomNodes()
}


const storeInBrowserStoragesDebounced = _.debounce(storeInBrowserStorages, 500)

inputNode.addEventListener('input', (e) => {
  userInput = e.target.value
  storeInBrowserStoragesDebounced()
})
