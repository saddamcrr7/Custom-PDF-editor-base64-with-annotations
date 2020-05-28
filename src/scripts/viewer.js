class Viewer {
  constructor(data) {
    this.scale = 1
    this.height = 0
    this.width = 0
    this.renderTask
    this.data = data
  }

  pageRender( pageIndex, elm) {
    const canvas = document.querySelector(elm)
        this.data.pdf.getPage(pageIndex).then((page) => {
  
          const viewport = page.getViewport({
            scale: this.scale
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
}

export default Viewer
