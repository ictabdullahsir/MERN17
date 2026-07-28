const myP = document.querySelectorAll('p')
console.log(myP)

const myPara = document.querySelector('.para')
console.log(myPara)

const myPara2 = document.querySelector('#para2')
console.log(myPara2)

myPara.textContent = "Paragraph 1"
myPara2.innerHTML = "<b style='color: red;'>Paragraph 2</b>"
