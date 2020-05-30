import TouchEvent from './vendor/touchevent.js/src/TouchEvent '
import getStyle from './util/getStyle'
import {
  Datepicker
} from 'vanillajs-datepicker';

class Editor {
  constructor() {
    this.data = []
    this.annotationField = false
    this.annotationIndex = 0
    this.editorPad = document.querySelector('.o-editor-pad')
    this.tiggerBtns = document.querySelectorAll('.c-editor-navbar__item')
    this.textTiggerBtn = document.querySelector(
      '.c-editor-navbar__item--text')
    this.dateTiggerBtn = document.querySelector(
      '.c-editor-navbar__item--date')
    this.initialsTiggerBtn = document.querySelector(
      '.c-editor-navbar__item--initials')
    this.signatureTiggerBtn = document.querySelector(
      '.c-editor-navbar__item--signature')
    this.annotationType = ''
    this.init()
  }

  createAnnotation() {
    this.editorPad.addEventListener('click', (e) => {
      let type = this.annotationType

      let annotation = {
        type: '',
        position: {
          x: 0,
          y: 0
        },
        width: Number,
        height: Number,
        size: 0,
        id: 0
      }

      if (this.annotationField == false) return

      this.annotationIndex += 1
      this.annotationField = false
      annotation.id = this.annotationIndex
      annotation.type = type
      annotation.position.x = e.offsetX
      annotation.position.y = e.offsetY

      let inputDom = ''

      if (type === 'text') {
        inputDom =
          '<textarea type="text" class="c-annotation__input"></textarea>'
      }
      if (type === 'date') {
        inputDom =
          '<input type="text" class="c-annotation__input c-annotation__input--date">'
      }
      if (type === 'image') {
        inputDom =
          '<div class="c-annotation__upload-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink" height="16px" version="1.1" viewBox="0 0 16 16" width="16px"><defs/><g fill="none" fill-rule="evenodd" id="Icons with numbers" stroke="none" stroke-width="1"><g fill="#fff" id="Group" transform="translate(-768.000000, -432.000000)"><path d="M769,446 L781,446 L781,443 L783,443 L783,446 L783,448 L769,448 Z M769,443 L771,443 L771,446 L769,446 Z M778,438 L778,445 L774,445 L774,438 L772,438 L776,433 L780,438 Z M778,438" id="Rectangle 217 copy"/></g></g></svg> Upload</div><input type="file" class="c-annotation__input c-annotation__input--image">'
      }


      const div = document.createElement('div')
      const annotationDom =
        `<div class="c-annotation__options"> <div class="c-annotation__option c-annotation__option--edit"> <svg viewBox="0 0 32 32"> <g id="Fill"> <path d="M29.12,6.05,26,2.88a3,3,0,0,0-4.24,0L6.29,18.29a3.06,3.06,0,0,0-.72,1.18L2.08,29.92l10.46-3.49a3.15,3.15,0,0,0,1.17-.72L29.12,10.29a3,3,0,0,0,0-4.24Zm-21,13.28,8.75-8.74,1.58,1.58L9.67,20.92ZM18.24,9.17l1.59-1.58,4.58,4.58-1.58,1.59ZM7.1,21.19l3.72,3.71L5.25,26.75Zm5.57,2.73-1.59-1.59,8.75-8.74,1.58,1.58Zm15-15-1.88,1.88L21.24,6.17l1.88-1.88A1,1,0,0,1,23.83,4a1,1,0,0,1,.71.29l3.17,3.18a1,1,0,0,1,.29.7A1,1,0,0,1,27.71,8.88Z"/> </g> </svg> </div><div class="c-annotation__option c-annotation__option-delete"> <svg viewBox="0 0 100 100"> <path d="M71,20H62a9,9,0,0,0-9-9H47a9,9,0,0,0-9,9H29a3,3,0,0,0,0,6H71a3,3,0,0,0,0-6ZM44,20a3,3,0,0,1,3-3h6a3,3,0,0,1,3,3Z"/> <path d="M68,30H32a3,3,0,0,0-3,3V80a9,9,0,0,0,9,9H62a9,9,0,0,0,9-9V33A3,3,0,0,0,68,30ZM45,73a3,3,0,0,1-6,0V46a3,3,0,0,1,6,0Zm16,0a3,3,0,0,1-6,0V46a3,3,0,0,1,6,0Z"/> </svg> </div></div><div class="c-annotation__value"></div> ${inputDom} <div class="c-annotation__resize"> <div class="c-annotation__resize-overlay"></div> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"> <g data-name="Layer 51" id="Layer_51"> <path d="M29,1h-.23c-.06,1-.13,1-.19,0L17.33,2h0a1,1,0,0,0,0,2h8.91l-9.62,9.63a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l10-10V14a1,1,0,0,0,2,0V3C30,2.45,29.55,2,29,1Z"/> <path d="M3,30H15a1,1,0,0,0,0-2H5.22L15.53,17.69a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0L4,26.39V17a1,1,0,0,0-2,0V29A1,1,0,0,0,3,30Z"/> </g> </svg> </div>`

      div.classList.add(`c-annotation`)
      div.classList.add(`is-active`)
      div.classList.add(`is-edit`)
      div.classList.add(`c-annotation--${type}`)
      div.innerHTML = annotationDom
      div.style.top = `${e.offsetY}px`
      div.style.left = `${e.offsetX}px`

      this.editorPad.appendChild(div)

      const input = div.querySelector('.c-annotation__input')
      const valueElm = div.querySelector('.c-annotation__value')
      input.focus()

      if (type == 'date') {
        const datepicker = new Datepicker(div.querySelector(
          '.c-annotation__input--date'), {
          autohide: true,
        })
        input.blur()
        input.focus()

        input.addEventListener('hide', () => {
          annotation.value = input.value
          valueElm.innerHTML = input.value
        })
      }

      if (type == "image") {
        valueElm.innerHTML = `No image`
        input.addEventListener('change', (e) => {
          const reader = new FileReader()
          reader.onload = () => {
            annotation.value = input.value
            annotation.imageSrc = reader.result
            valueElm.innerHTML = `<img src="${reader.result}" >`
          }
          reader.readAsDataURL(e.target.files[0])
        })
      } else {
        div.addEventListener('mouseleave', () => {
          annotation.value = input.value
          valueElm.innerHTML = input.value
        })
      }

      div.addEventListener('mouseleave', () => {
        div.classList.remove('is-active')
        div.classList.remove('is-edit')
        input.blur()
      })

      div.addEventListener('mouseenter', () => {
        div.classList.add('is-active')
      })

      const editBtn = div.querySelector('.c-annotation__option--edit')
      editBtn.addEventListener('click', () => {
        div.classList.add('is-edit')
        input.focus()
      })

      const deleteBtn = div.querySelector('.c-annotation__option-delete')
      deleteBtn.addEventListener('click', () => {
        this.delete(div, annotation.id)
      })

      this.removeTiggerBtnClass()
      this.resize(div, annotation)
      this.data.push(annotation)
      this.completeBtn()
    })
  }

  resize(elm, annotation) {
    const elmStyle = getStyle(elm)
    let getElmWidth = elmStyle.width.match(/\d/g)
    let getElmHeight = elmStyle.height.match(/\d/g)
    getElmWidth = Number(getElmWidth.join(""))
    getElmHeight = Number(getElmHeight.join(""))

    let ElmWidth = getElmWidth
    let ElmHeight = getElmHeight

    const resizeTouch = new TouchEvent('.o-editor-pad', (e) => {
      const resizeBtnIcon = elm.querySelector(
        '.c-annotation__resize-overlay')

      if (e.target == resizeBtnIcon) {
        ElmWidth = getElmWidth + e.walkX
        ElmHeight = getElmHeight + e.walkY
        elm.style.width = `${ElmWidth}px`
        elm.style.height = `${ElmHeight}px`
      }
    })

    resizeTouch.endEvent = (e) => {
      getElmWidth = ElmWidth
      getElmHeight = ElmHeight
      elm.style.width = `${ElmWidth}px`
      elm.style.height = `${ElmHeight}px`
      annotation.width = ElmWidth
      annotation.height = ElmHeight
    }


  }

  delete(elm, index) {
    elm.remove()
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === index) {
        this.data.splice(i, 1);
      }
    }
    this.completeBtn()
  }


  typeText() {
    this.textTiggerBtn.addEventListener('click', (e) => {
      this.annotationField = true
      this.annotationType = 'text'
      this.createAnnotation()
      this.removeTiggerBtnClass()
      this.textTiggerBtn.classList.add('is-active')
    })
  }

  typeDate() {
    this.dateTiggerBtn.addEventListener('click', (e) => {
      this.annotationField = true
      this.annotationType = 'date'
      this.createAnnotation()
      this.removeTiggerBtnClass()
      this.dateTiggerBtn.classList.add('is-active')
    })
  }

  typeInitials() {
    this.initialsTiggerBtn.addEventListener('click', (e) => {
      this.annotationField = true
      this.annotationType = 'image'
      this.createAnnotation()
      this.removeTiggerBtnClass()
      this.initialsTiggerBtn.classList.add('is-active')
    })
  }

  typeSignature() {
    this.signatureTiggerBtn.addEventListener('click', (e) => {
      this.annotationField = true
      this.annotationType = 'image'
      this.createAnnotation()
      this.removeTiggerBtnClass()
      this.signatureTiggerBtn.classList.add('is-active')
    })
  }

  completeBtn(display) {
   const Btn = document.getElementById('complete-btn')
   if(this.data.length < 1) {
     Btn.style.display = 'none'
   }else {
    Btn.style.display = 'block'
   }
  }

  removeTiggerBtnClass() {
    this.tiggerBtns.forEach(element => {
      element.classList.remove('is-active')
    });
  }


  init() {
    this.typeText()
    this.typeDate()
    this.typeInitials()
    this.typeSignature() 
  }
}

export default Editor
