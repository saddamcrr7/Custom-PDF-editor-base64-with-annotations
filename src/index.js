import './styles/main.scss';

import './scripts/sidebar'
import {
  PDFDocument,
  rgb,
  StandardFonts
} from 'pdf-lib'
import PdfDataProcess from './scripts/Pdf-data-process'
import demoData from './scripts/data/demoData'
import Viewer from './scripts/viewer'
import Editor from './scripts/Editor'

let inputBase46data = demoData

let pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc =
  '//mozilla.github.io/pdf.js/build/pdf.worker.js'

window.addEventListener('load', () => {
  let rawViewerPdfData = new PdfDataProcess(inputBase46data)
  let viewer = new Viewer(rawViewerPdfData)

  const editor = new Editor()


  function anocontainer() {
    document.querySelectorAll('.o-annotation-container').forEach(elm => {
      elm.classList.remove('is-active')
    })
    document.querySelector(
      `.o-annotation-container--${editor.editPageIndex}`).classList.add(
      'is-active')

  }




  setTimeout(() => {
    const pgBtns = document.querySelectorAll('.c-pagination__btn')
    pgBtns.forEach(pgBtn => {
      pgBtn.addEventListener('click', () => {
        editor.editPageIndex = viewer.viewPageIndex
        anocontainer()
      })
    })

    const navPages = document.querySelectorAll('.o-viewer__page')
    navPages.forEach(navPage => {
      navPage.addEventListener('click', () => {
        editor.editPageIndex = viewer.viewPageIndex
        anocontainer()
      })
    })
  }, 2200)



  const compalteBtn = document.getElementById('complete-btn')

  compalteBtn.addEventListener('click', (e) => {
    (async () => {
      const dataUri = 'data:application/pdf;base64,' +
        inputBase46data
      const pdfDoc = await PDFDocument.load(dataUri)
      const pages = pdfDoc.getPages()
      const editPage = pages[viewer.viewPageIndex - 1]

      const helveticaFont = await pdfDoc.embedFont(StandardFonts
        .Helvetica)
      const helveticaFontBlod = await pdfDoc.embedFont(StandardFonts
        .HelveticaBold)
      const helveticaFontOblique = await pdfDoc.embedFont(
        StandardFonts.HelveticaOblique)
      const HelveticaFontBoldOblique = await pdfDoc.embedFont(
        StandardFonts.HelveticaBoldOblique)

      const {
        width,
        height
      } = editPage.getSize()

      editor.data.forEach(data => {

        if (data.type === 'text' || data.type ===
          'date') {

          let fontFormet = helveticaFont
          if (data.formet == 'bold') {
            fontFormet = helveticaFontBlod
          } else if (data.formet == 'italic') {
            fontFormet = helveticaFontOblique
          } else if (data.formet == 'boldItalic') {
            fontFormet = HelveticaFontBoldOblique
          } else {
            fontFormet = helveticaFont
          }

          pages[data.editPageIndex - 1].drawText(
            `${data.value}`, {
              x: data.position.x + 10,
              y: height - (data.position.y + (24 / 16 * data
                .fontSize)),
              size: data.fontSize,
              lineHeight: 24 / 16 * data.fontSize,
              color: rgb(data.color.red, data.color.green,
                data.color.blue),
              font: fontFormet,
              maxWidth: data.width - 20,
            })
        }
        if (data.type == 'image') {
          (async () => {
            let image = await pdfDoc.embedPng(data.imageSrc)

            pages[data.editPageIndex - 1].drawImage(image, {
              x: data.position.x,
              y: height - (data.position.y + data
                .height),
              width: data.width,
              height: data.height,
            })
          })()
        }
      })

      const outputBase46data = await pdfDoc.saveAsBase64()

      let EidtedViewerPdfData = new PdfDataProcess(outputBase46data)
      inputBase46data = outputBase46data
      viewer.destroy()
      viewer.reborn(EidtedViewerPdfData)
      editor.clear()
      compalteBtn.style.display = 'none'
    })()

  })

})
