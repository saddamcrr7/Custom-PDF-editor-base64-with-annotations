import {
  addEvent,
} from './components/utility'

export default class TouchEvent {

  constructor(elm, callback) {
    this.callback = callback
    this.endEvent = () => {}
    this.elem = document.querySelector(`${elm}`)
    this.isDown = !1
    this.startX = 0
    this.startY = 0
    this.endX = 0
    this.endY = 0
    this.walkX = 0
    this.walkY = 0
    this.target

    this.init()
  }


  notMobile(element) {

    addEvent(element, 'mousedown', (e) => {
      this.isDown = !0
      this.startX = e.clientX - element.offsetLeft
      this.startY = e.clientY - element.offsetTop
      this.target = e.target
    })

    addEvent(element, 'mouseleave', () => {
      this.isDown = !1
    })

    addEvent(element, 'mouseup', (e) => {
      this.isDown = !1
      this.endEvent(e)
      this.target = e.target
    })

    addEvent(element, 'mousemove', (e) => {

      if (this.isDown) {
        this.target = e.target
        e.preventDefault()

        this.endX = e.clientX
        this.endY = e.clientY
        this.walkX = this.endX - this.startX
        this.walkY = this.endY - this.startY
        this.callback(this)

      }


    })

  }

  mobile(element) {

    addEvent(element, 'touchstart', (e) => {
      const ev = e.changedTouches[0]

      this.isDown = !0
      this.startX = ev.clientX - element.offsetLeft
      this.startY = ev.clientY - element.offsetTop
      this.target = ev.target
    })

    addEvent(element, 'touchend', (e) => {
      this.isDown = !1
    })

    addEvent(element, 'touchmove', (e) => {

      if (this.isDown) {
        this.target = e.target
        e.preventDefault()
        const ev = e.changedTouches[0]

        this.endX = ev.clientX
        this.endY = ev.clientY
        this.walkX = this.endX - this.startX
        this.walkY = this.endY - this.startY
        this.callback(this)
      }
    })
  }

  init() {
      this.notMobile(this.elem)
      this.mobile(this.elem)
  }

}

window.TouchEvent = TouchEvent
