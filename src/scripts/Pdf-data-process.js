class PdfDataProcess {
  constructor(base64) {
    this.data = base64
    this.init()
  }

  dataProcess() {
    const pdfData = atob(`${this.data}`)
    const pdfjsLib = window['pdfjs-dist/build/pdf']

    const loadingTask = pdfjsLib.getDocument({
      data: pdfData
    })

    loadingTask.promise.then(pdf => {
      this.pdf = pdf
    }, reason => {
      console.error(reason);
    })
  }

  init() {
      this.dataProcess()
  }
}

export default PdfDataProcess
