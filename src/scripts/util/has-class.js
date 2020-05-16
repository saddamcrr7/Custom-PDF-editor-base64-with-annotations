const supportClassList = 'classList' in document.createElement('div')

function classReg(c) {
    return new RegExp("(^|\\s+)" + c + "(\\s+|$)");
}

const  hasClass = supportClassList ? function hasClass(el, c) {
    return el.classList.contains(c)
  } : function (el, c) {
    return classReg(c).test(el.className)
}

export default hasClass