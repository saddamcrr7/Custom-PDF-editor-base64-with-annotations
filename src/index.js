import './styles/main.scss';

import './scripts/sidebar'
import {
  PDFDocument
} from 'pdf-lib'
import PdfDataProcess from './scripts/Pdf-data-process'
import demoData from './scripts/data/demoData'
import Viewer from './scripts/viewer' 
import Pagination from './scripts/components/pagination'
import Editor from './scripts/Editor'

var pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc =
  '//mozilla.github.io/pdf.js/build/pdf.worker.js'

window.addEventListener('load', () => {
  let viewerPdfData = new PdfDataProcess(demoData)
  let viewerPdfScale = 1
  const mainViewer = new Viewer(viewerPdfData)
  const pagesViewer = new Viewer(viewerPdfData)
  let viewerPageElm = document.querySelector('.o-viewer__pages')

  mainViewer.scale = 1
  pagesViewer.scale = 0.2

  setTimeout(() => {
    mainViewer.pageRender(1, '.o-viewer__main-canvas')

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
      viewerPdfScale = 1
      mainViewer.scale = 1
      mainViewer.scale = viewerPdfScale
      updateMainCotainerSize()
      mainViewer.pageRender(index,
        '.o-viewer__main-canvas')
      const pages = document.querySelectorAll('.o-viewer__page')
      pages.forEach(element => element.classList.remove(
        'is-active'));
      pages[index - 1].classList.add('is-active')

    })

    const zoomInBtn = document.querySelector('.o-viewer__zoom--in')
    const zoomOutBtn = document.querySelector('.o-viewer__zoom--out')

    zoomInBtn.addEventListener('click', () => {
      viewerPdfScale += 0.25
      mainViewer.scale = viewerPdfScale
      mainViewer.pageRender(pagePagination.index,
        '.o-viewer__main-canvas')
      updateMainCotainerSize()
    })

    zoomOutBtn.addEventListener('click', () => {
      viewerPdfScale -= 0.25
      mainViewer.scale = viewerPdfScale
      mainViewer.pageRender(pagePagination.index,
        '.o-viewer__main-canvas')
      updateMainCotainerSize()
    })

    function updateMainCotainerSize() {
      const mainContainer = document.querySelector(
        '.o-viewer__main-container')
      setTimeout(() => {
        mainContainer.style.width = `${mainViewer.width}px`
        mainContainer.style.height = `${mainViewer.height}px`

        if (mainViewer.width > window.innerWidth) {
          document.querySelector('.o-viewer__main').style.display =
            'block'
        } else {
          document.querySelector('.o-viewer__main').style.display =
            'flex'
        }
      }, 1)
    }


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
        index + 1,
        `.o-viewer__page-canvas-${index}`
      )

      canvas.addEventListener('click', () => {
        viewerPdfScale = 1
        mainViewer.scale = 1
        mainViewer.pageRender(index + 1, '.o-viewer__main-canvas')
        updateMainCotainerSize()
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

    const editor = new Editor()

  }, 700)


})
