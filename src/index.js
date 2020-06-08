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

let base46data = demoData

let pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc =
  '//mozilla.github.io/pdf.js/build/pdf.worker.js'

window.addEventListener('load', () => {
  let rawViewerPdfData = new PdfDataProcess(base46data)
  let viewer = new Viewer(rawViewerPdfData)

  const editor = new Editor()

  const signatureTiggerBtn = document.querySelector(
    '.c-editor-navbar__item--signature')

  signatureTiggerBtn.addEventListener('click', () => {
    if (viewer.viewPageIndex == viewer.pageNumber) {
      editor.typeSignature()
    }
  })

  const compalteBtn = document.getElementById('complete-btn')

  compalteBtn.addEventListener('click', (e) => {
    (async () => {
      const dataUri = 'data:application/pdf;base64,' + base46data
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

          editPage.drawText(
            `${data.value}`, {
              x: data.position.x + 10,
              y: height - (data.position.y + 27),
              size: 16,
              color: rgb(data.color.red, data.color.green,
                data.color.blue),
              font: fontFormet,
              maxWidth: data.width,
            })
        }
        if (data.type == 'image') {
          (async () => {
            let image = await pdfDoc.embedPng(data.imageSrc)

            editPage.drawImage(image, {
              x: data.position.x,
              y: height - (data.position.y + data
                .height),
              width: data.width,
              height: data.height,
            })
          })()
        }
      })

      const pdfBytes = await pdfDoc.saveAsBase64()
      let EidtedViewerPdfData = new PdfDataProcess(pdfBytes)
      base46data = pdfBytes
      viewer.destroy()
      viewer.reborn(EidtedViewerPdfData)
      editor.clear()
      compalteBtn.style.display = 'none'
    })()

  })

})
