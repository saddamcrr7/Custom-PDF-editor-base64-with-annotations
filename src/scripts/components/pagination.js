class Pagination {
  constructor(pagesNumber, callback) {
    this.index = 1
    this.pagesNumber = pagesNumber
    this.init()
    this.callback = callback
  }

  next(countElm) {
    if (this.index == this.pagesNumber) {
      this.index = 1
    } else {
      this.index += 1
    }
    countElm.innerHTML = `${this.index} / ${this.pagesNumber}`
    this.callback(this.index)
  }

  prev(countElm) {
    if (this.index == 1) {
      this.index = this.pagesNumber
    } else {
      this.index -= 1
    }
    countElm.innerHTML = `${this.index} / ${this.pagesNumber}`
    this.callback(this.index)
  }


  init() {
    const nextBtn = document.querySelector('.c-pagination__btn--next')
    const prevBtn = document.querySelector('.c-pagination__btn--prev')
    const countElm = document.querySelector('.c-pagination__count')
    countElm.innerHTML = `${this.index} / ${this.pagesNumber}`

    nextBtn.addEventListener('click', () => {
      const annotations = document.querySelectorAll('.c-annotation')
      if (annotations.length) return
      this.next(countElm)
    })
    prevBtn.addEventListener('click', () => {
      const annotations = document.querySelectorAll('.c-annotation')
      if (annotations.length) return
      this.prev(countElm)
    })
  }


}

export default Pagination
