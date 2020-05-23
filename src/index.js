import './styles/main.scss';
import './scripts/sidebar'
import {
  PDFDocument
} from 'pdf-lib'
import PdfDataProcess from './scripts/Pdf-data-process'
import demoData from './scripts/data/demoData'
import Viewer from './scripts/viewer'
import Pagination from './scripts/components/pagination'

window.addEventListener('load', () => {
  let viewerPdfData = new PdfDataProcess(demoData)

  const mainViewer = new Viewer()
  mainViewer.scale = 1

  mainViewer.pageRender(viewerPdfData, 1, '.o-viewer__main-canvas')

  const pagesViewer = new Viewer()
  pagesViewer.scale = 0.2
  let viewerPageElm = document.querySelector('.o-viewer__pages')

  setTimeout(() => {
    const pageNumber = viewerPdfData.pdf.numPages

    viewerPdfData.pdf.getMetadata().then(metadata => {
      const nameElem = document.querySelector('.o-viewer__doc-name')
      if (metadata.info.Title == undefined) {
        nameElem.innerHTML = `Undefined This Doc Name`
      } else {
        nameElem.innerHTML = `${metadata.info.Title}`
      }
    }).catch((err) => {
      console.error(err);
    });

    const pagePagination = new Pagination(pageNumber, (index) => {
      mainViewer.pageRender(viewerPdfData, index,
        '.o-viewer__main-canvas')
      const pages = document.querySelectorAll('.o-viewer__page')
      pages.forEach(element => element.classList.remove(
        'is-active'));
      pages[index - 1].classList.add('is-active')
    })

    for (let index = 0; index < pageNumber; index++) {
      const li = document.createElement('li')
      li.classList.add('o-viewer__page')

      const canvas = document.createElement('canvas')
      canvas.classList.add(`o-viewer__page-canvas`)
      canvas.classList.add(`o-viewer__page-canvas-${index}`)

      const div = document.createElement('div')
      div.classList.add('o-viewer__page-index')
      div.innerHTML = `${index+1} / ${pageNumber}`

      li.append(canvas)
      li.append(div)
      viewerPageElm.append(li)
      document.querySelectorAll('.o-viewer__page')[0].classList.add(
        'is-active')
      pagesViewer.pageRender(
        viewerPdfData,
        index + 1,
        `.o-viewer__page-canvas-${index}`
      )

      canvas.addEventListener('click', () => {
        mainViewer.pageRender(viewerPdfData, index + 1,
          '.o-viewer__main-canvas')
        const countElm = document.querySelector(
          '.c-pagination__count')
        countElm.innerHTML = `${index+1} / ${pageNumber}`

        const pages = document.querySelectorAll('.o-viewer__page')
        pages.forEach(element => element.classList.remove(
          'is-active'));
        pages[index].classList.add('is-active')

        pagePagination.index = index + 1

      })
    }



  }, 500)


})
