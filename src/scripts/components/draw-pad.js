import SignaturePad from 'signature_pad'

class DrawPad {
  constructor() {
    this.stockSize = 2
    this.drawColor = '#000'
    this.DrawPadElm = document.querySelector('.o-draw-pad')
    this.canvas = document.querySelector('.o-draw-pad__canvas')
    this.dataURL
    this.pad = new SignaturePad(this.canvas)
    this.init()
  }

  getColor() {
    const colorElems = document.querySelectorAll('.o-draw-pad__color')
    colorElems.forEach(elm => {
      elm.style.backgroundColor = elm.dataset.value
      elm.addEventListener('click', () => {
        this.drawColor = elm.dataset.value
        this.pad.penColor = this.drawColor
        colorElems.forEach(elem => elem.classList.remove('is-active'))
        elm.classList.add('is-active')
      })
    })
  }

  resizeCanvas() {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);

    this.canvas.width = this.canvas.offsetWidth * ratio;
    this.canvas.height = this.canvas.offsetHeight * ratio;
    this.canvas.getContext("2d").scale(ratio, ratio);

    this.pad.clear();
  }



  open(type) {
    this.DrawPadElm.style.display = 'block'
    const drawPadNameElm = document.querySelector('.o-draw-pad__title-name')
    drawPadNameElm.innerHTML = type
  }

  close() {
    this.DrawPadElm.style.display = 'none'
    this.pad.clear();
  }

  clear() {
    const clearElm = document.querySelector('.o-draw-pad__clear')
    clearElm.addEventListener('click', () => {
      this.pad.clear()
    })
  }

  save() {
    if (this.pad.isEmpty()) {
      alert("Please provide a signature first.")
      return
    } else {
      this.dataURL = this.pad.toDataURL()
    }

    this.close()
  }

  cancel() {
    const cancelBtn = document.querySelector('.o-draw-pad__cancel')
    cancelBtn.addEventListener('click', () => {
      this.close()
      this.pad.clear();
    })
  }

  init() {
    this.getColor()
    this.cancel()
    this.clear()

    window.onresize = this.resizeCanvas;
    this.resizeCanvas();
  }
}

export default DrawPad
