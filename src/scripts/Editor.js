class Editor {
  constructor() {
    this.data = []
    this.annotation = {
      type: String,
      position: {
        x: Number,
        y: Number
      },
      width: Number,
      height: Number,
      size: Number
    }
    this.textField = false
    this.textFieldIndex = 0
    this.signatureEdible = false
    this.editorPad = document.querySelector('.o-editor-pad')


    this.init()
  }

  createAnnotation(type) {

    this.editorPad.addEventListener('click', (e) => {
      if (this.textField == false) return
      const div = document.createElement('div')
      const annotationDom = `<div class="c-annotation__options"> <div class="c-annotation__option c-annotation__option--edit"> <svg viewBox="0 0 32 32"> <g id="Fill"> <path d="M29.12,6.05,26,2.88a3,3,0,0,0-4.24,0L6.29,18.29a3.06,3.06,0,0,0-.72,1.18L2.08,29.92l10.46-3.49a3.15,3.15,0,0,0,1.17-.72L29.12,10.29a3,3,0,0,0,0-4.24Zm-21,13.28,8.75-8.74,1.58,1.58L9.67,20.92ZM18.24,9.17l1.59-1.58,4.58,4.58-1.58,1.59ZM7.1,21.19l3.72,3.71L5.25,26.75Zm5.57,2.73-1.59-1.59,8.75-8.74,1.58,1.58Zm15-15-1.88,1.88L21.24,6.17l1.88-1.88A1,1,0,0,1,23.83,4a1,1,0,0,1,.71.29l3.17,3.18a1,1,0,0,1,.29.7A1,1,0,0,1,27.71,8.88Z"/> </g> </svg> </div><div class="c-annotation__option c-annotation__option-delete"> <svg viewBox="0 0 100 100"> <path d="M71,20H62a9,9,0,0,0-9-9H47a9,9,0,0,0-9,9H29a3,3,0,0,0,0,6H71a3,3,0,0,0,0-6ZM44,20a3,3,0,0,1,3-3h6a3,3,0,0,1,3,3Z"/> <path d="M68,30H32a3,3,0,0,0-3,3V80a9,9,0,0,0,9,9H62a9,9,0,0,0,9-9V33A3,3,0,0,0,68,30ZM45,73a3,3,0,0,1-6,0V46a3,3,0,0,1,6,0Zm16,0a3,3,0,0,1-6,0V46a3,3,0,0,1,6,0Z"/> </svg> </div></div><div class="c-annotation__value"></div><input type="text" class="c-annotation__input"> <div class="c-annotation__resize"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"> <g data-name="Layer 51" id="Layer_51"> <path d="M29,1h-.23c-.06,1-.13,1-.19,0L17.33,2h0a1,1,0,0,0,0,2h8.91l-9.62,9.63a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l10-10V14a1,1,0,0,0,2,0V3C30,2.45,29.55,2,29,1Z"/> <path d="M3,30H15a1,1,0,0,0,0-2H5.22L15.53,17.69a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0L4,26.39V17a1,1,0,0,0-2,0V29A1,1,0,0,0,3,30Z"/> </g> </svg> </div>`

      div.classList.add(`c-annotation`)
      div.classList.add(`is-active`)
      div.classList.add(`c-annotation-${type}`)
      div.innerHTML = annotationDom
      div.style.top = `${e.offsetY}px`
      div.style.left = `${e.offsetX}px`
      this.editorPad.appendChild(div)

      this.textFieldIndex +=1
      this.textField = false
      this.annotation.type = type
      this.annotation.position.x = e.offsetX
      this.annotation.position.y = e.offsetY
      this.data.push(this.annotation)

      div.addEventListener('mouseleave',()=> {
          div.classList.remove('is-active')
      })
    })
  }

  typeText() {
    const textTiggerBtn = document.querySelector(
      '.c-editor-navbar__item--text')

    textTiggerBtn.addEventListener('click', (e) => {
      this.textField = true
      this.createAnnotation('text')
    })
  }


  init() {
    this.typeText()
  }
}

export default Editor
