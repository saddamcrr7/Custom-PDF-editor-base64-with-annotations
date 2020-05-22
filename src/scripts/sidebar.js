const sidebar = document.querySelector('.o-viewer__sitebar')
const toggler = document.querySelector('.o-viewer__sitebar-toggler')
const mainContainer = document.querySelector('.o-main__container')
let isOpen = !0

toggler.addEventListener('click', () => {
  if (isOpen) {
    sidebar.style.left = '0'
    mainContainer.style.paddingLeft ='165px'
    isOpen = 0
  } else {
    sidebar.style.left = '-165px'
    mainContainer.style.paddingLeft ='0'
    isOpen = !0
  }
})
