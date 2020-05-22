import './styles/main.scss';
import './scripts/sidebar'
import {
  PDFDocument
} from 'pdf-lib'
import PdfDataProcess from './scripts/Pdf-data-process'
import demoData from './scripts/util/demoData'
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
      document.querySelector('.o-viewer__doc-name').innerHTML =
        `${metadata.info.Title}`
    }).catch(function (err) {
      console.log(err);
    });

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
      })
    }

    const pagePagination = new Pagination(pageNumber, (index) => {
      mainViewer.pageRender(viewerPdfData, index,
        '.o-viewer__main-canvas')
      const pages = document.querySelectorAll('.o-viewer__page')
      pages.forEach(element => element.classList.remove(
        'is-active'));
      pages[index - 1].classList.add('is-active')
    })

  }, 500)


})
