let defView = document.defaultView;

const getStyle = defView && defView.getComputedStyle ?
  function( elem ) {
    return defView.getComputedStyle( elem, null )
  } :
  function( elem ) {
    return elem.currentStyle
}


export default getStyle