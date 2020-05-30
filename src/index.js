import './styles/main.scss';

import './scripts/sidebar'
import {
  PDFDocument
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

    const compalteBtn = document.getElementById('complete-btn')

    compalteBtn.addEventListener('click', (e) => {
      (async () => {
        const dataUri = 'data:application/pdf;base64,' + base46data
        const pdfDoc = await PDFDocument.load(dataUri)
        const pages = pdfDoc.getPages()
        const editPage = pages[viewer.viewPageIndex - 1]
        const {
          width,
          height
        } = editPage.getSize()

        editor.data.forEach(data => {
          if (data.type === 'text' || data.type ===
            'date') {
            editPage.drawText(
              `${data.value}`, {
                x: data.position.x,
                y: height - data.position.y,
                size: 16,
              })
          }
          if (data.type == 'image') {
            (async () => {
              let image
              let fileExtension = data.value.split('.')
                .pop();

              if (fileExtension == 'png') {
                image = await pdfDoc.embedPng(data
                  .imageSrc)
                embedImage(image)
              }
              if (fileExtension == 'jpg') {
                image = await pdfDoc.embedJpg(data
                  .imageSrc)
                embedImage(image)
              }

              function embedImage(image) {
                editPage.drawImage(image, {
                  x: data.position.x,
                  y: height - (data.position.y +
                    data.height),
                  width: data.width,
                  height: data.height,
                })
              }



            })()
          }
        })

        const pdfBytes = await pdfDoc.saveAsBase64()
        let EidtedViewerPdfData = new PdfDataProcess(pdfBytes)
        base46data = pdfBytes
        viewer.destroy()
        viewer.reborn(EidtedViewerPdfData)
      })()

    })

})
