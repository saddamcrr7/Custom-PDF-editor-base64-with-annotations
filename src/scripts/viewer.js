class Viewer {
    constructor() {
        this.scale = 1
    }

    pageRender(data, pageIndex, elm) {
        const canvas = document.querySelector(elm)
        setTimeout(() => {
            data.pdf.getPage(pageIndex).then( (page) =>{

                var viewport = page.getViewport({
                  scale: this.scale
                });
            
                var context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
            
                var renderContext = {
                  canvasContext: context,
                  viewport: viewport
                };
                const renderTask = page.render(renderContext);

              });
        }, 500)
    }
}

export default Viewer   