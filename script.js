// this method isn't supported on all browsers yet
// import soundItems from './sounds.json' assert {type : 'json'}

// same as above but with fetch
let file = await fetch('./sounds.json')
let soundItems = await file.json()

// list JS (https://listjs.com/docs/)
const options = {
  valueNames: [ 'name', 'command', {name: 'source', attr: 'href'} ],
  page: 6,
  pagination: {
    paginationClass: "pagination",
    innerWindow: 0,
    outerWindow: 0
  },
  item: 
    `<li class="sound-item">
      <div class="data-container">
        <p class="name"></p>
        <div class="source-container">
          <a class="source" target="_blank">Source</a>
          <i class='bx bx-link-external' ></i>
        </div>
      </div>
      
        <div class="command" onclick="showAlert()"></div>
      
    </li>`
}
let values = soundItems
const soundList = new List('soundboard', options, values)

// success alert
const alert = document.querySelector('.success-alert')

const showAlert = () => {
  alert.classList.add('is-active')
  const hide = () => {
    alert.classList.remove('is-active')
  }
  setTimeout(hide, 2000)
}

// handles copying command to user clipboard
const handleEventListeners = () => {
  const commands = document.querySelectorAll(".command")
  commands.forEach(command => {
    const copyToClipboard = (event) => {
      console.log(command.innerText)
      const cb = navigator.clipboard
      cb.writeText(command.innerText)
      event.stopImmediatePropagation()
      showAlert()
    }
    command.removeEventListener('click', copyToClipboard)
    command.addEventListener('click', copyToClipboard)
  })
}

// calls copyCommand on page load and on list update
window.addEventListener("load", handleEventListeners)
soundList.on('updated', handleEventListeners)

// gets date for copyright section
let date =  new Date().getFullYear()
const dateElement = document.querySelector('.current-year')
dateElement.innerHTML = date

// twitch player
const twitchPlayerOptions = {
  height: '100%',
  width: '100%',
  channel: "vred_0",
  parent: ["tu0mas.github.io"]
}
const player = new Twitch.Player("twitch-player", twitchPlayerOptions)

// toggle chat
const openChatBtn = document.querySelector('#open-chat')
const twitchContainer = document.querySelector('.twitch-embed-container')

openChatBtn.addEventListener('click', () => {
  if (twitchContainer.classList.contains('chat-is-active')) {
    twitchContainer.classList.remove('chat-is-active')
    openChatBtn.innerText = 'Afficher le chat'
  } else {
    twitchContainer.classList.add('chat-is-active')
    openChatBtn.innerText = 'Masquer le chat'
  }
})
