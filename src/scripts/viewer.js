import Pagination from './components/pagination'

class Viewer {
  constructor(data) {
    this.scale = 1
    this.height = 0
    this.width = 0
    this.renderTask
    this.data = data
    this.pageNumber
    this.viewPageIndex = 1
    this.init()
  }

  pageRender(pageIndex, elm, scale = this.scale) {
    const canvas = document.querySelector(elm)
    this.data.pdf.getPage(pageIndex).then((page) => {
      const viewport = page.getViewport({
        scale: scale
      })
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      }
      const renderTask = page.render(renderContext);
      this.renderTask = renderTask
      this.height = canvas.height
      this.width = canvas.width
    })
  }


  renderMainPage(index = 1) {
    this.pageRender(index, '.o-viewer__main-canvas')
  }

  renderSidebarPagesAndPagination() {
    const pagePagination = new Pagination(this.pageNumber, (index) => {
      const pages = document.querySelectorAll('.o-viewer__page')
      pages.forEach(element => element.classList.remove(
        'is-active'));
      pages[index - 1].classList.add('is-active')
      this.scale = 1
      this.renderMainPage(index)
      this.updateContainerSize()
      this.viewPageIndex = index
    })

    let viewerPageElm = document.querySelector('.o-viewer__pages')

    for (let index = 0; index < this.pageNumber; index++) {
      const li = document.createElement('li')
      li.classList.add('o-viewer__page')

      const canvas = document.createElement('canvas')
      canvas.classList.add(`o-viewer__page-canvas`)
      canvas.classList.add(`o-viewer__page-canvas-${index}`)

      const div = document.createElement('div')
      div.classList.add('o-viewer__page-index')
      div.innerHTML = `${index+1} / ${this.pageNumber}`

      li.append(canvas)
      li.append(div)
      viewerPageElm.append(li)

      this.pageRender(index + 1, `.o-viewer__page-canvas-${index}`, 0.24)

      const pages = document.querySelectorAll('.o-viewer__page')
      pages[0].classList.add('is-active')

      canvas.addEventListener('click', () => {
        this.scale = 1
        this.renderMainPage(index + 1)

        const countElm = document.querySelector('.c-pagination__count')

        countElm.innerHTML = `${index+1} / ${this.pageNumber}`
        pages.forEach(element => element.classList.remove('is-active'));
        pages[index].classList.add('is-active')

        this.viewPageIndex = index + 1
        pagePagination.index = this.viewPageIndex
        this.updateContainerSize()
      })
    }
  }

  renderDocName() {
    this.data.pdf.getMetadata().then(metadata => {
      const nameElem = document.querySelector('.o-viewer__doc-name')
      if (metadata.info.Title == undefined) {
        nameElem.innerHTML = `Undefined This Doc Name`
      } else {
        nameElem.innerHTML = `${metadata.info.Title}`
      }
    }).catch((err) => {
      console.error(err);
    });
  }

  updateContainerSize() {
    const mainContainer = document.querySelector(
      '.o-viewer__main-container')
    setTimeout(() => {
      mainContainer.style.width = `${this.width}px`
      mainContainer.style.height = `${this.height}px`

      if (this.width > window.innerWidth) {
        document.querySelector('.o-viewer__main').style.display =
          'block'
      } else {
        document.querySelector('.o-viewer__main').style.display =
          'flex'
      }
    }, 0.1)
  }

  zooms() {
    const zoomInBtn = document.querySelector('.o-viewer__zoom--in')
    const zoomOutBtn = document.querySelector('.o-viewer__zoom--out')

    zoomInBtn.addEventListener('click', () => {
      this.scale += 0.25
      this.pageRender(this.viewPageIndex, '.o-viewer__main-canvas')
      this.updateContainerSize()
    })

    zoomOutBtn.addEventListener('click', () => {
      if (this.scale == 0.25) return
      this.scale -= 0.25
      this.pageRender(this.viewPageIndex, '.o-viewer__main-canvas')
      this.updateContainerSize()
    })
  }

  destroy() {
    this.data = null

  }

  reborn(data) {
    this.data = data
    setTimeout(() => {
      this.renderMainPage(this.viewPageIndex )
    }, 1000)
  }

  init() {
    setTimeout(() => {
      this.pageNumber = this.data.pdf.numPages
      this.renderMainPage()
      this.renderSidebarPagesAndPagination()
      this.renderDocName()
      this.zooms()
    }, 1000)
  }
}

export default Viewer
