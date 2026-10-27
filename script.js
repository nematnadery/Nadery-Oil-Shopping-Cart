let products = [
    {id: 1, name: 'Petrol 92 Premume', price: 90, typeOfMoney: 'AFN', catagory: 'PETROL', img: 'pic/pitrol92.jpg'},
    {id: 2, name: 'Diesel 01 (Russian)', price: 82, typeOfMoney: 'AFN', catagory: 'Diesel', img: 'pic/disel01.jpg'},
    {id: 3, name: 'Engine Oil 20W-50', price: 450, typeOfMoney: 'AFN', catagory: 'Engine Oil', img: 'pic/engine-oil.jpg'},
]


let productListContainer = document.getElementById('product-list')
let cartTtemsContainer = document.getElementById('cart-items')


products.forEach(function(item){
    let articalElem = document.createElement('article')
    articalElem.classList.add('product-card')

    let imgDivElem = document.createElement('div')
    imgDivElem.className = 'product-img petrol'

    let imgElem = document.createElement('img')
    imgElem.setAttribute('src', item.img)
    imgElem.setAttribute('alt', item.name)

    let productBodyDiveElem = document.createElement('div')
    productBodyDiveElem.classList.add('product-body')

    let spanElem = document.createElement('span')
    spanElem.classList.add('product-category')
    spanElem.innerHTML = item.catagory

    let h3Elem = document.createElement('h3')
    h3Elem.classList.add('product-name')
    h3Elem.innerHTML = item.name

    let productPriceElem = document.createElement('div')
    productPriceElem.classList.add('product-price')
    
    let strongElem = document.createElement('strong')
    strongElem.textContent = item.price
    
    let perLiterElem = document.createElement('span')
    perLiterElem.textContent = '/ liter'
    
    productPriceElem.append(strongElem, ' ' + item.typeOfMoney + ' ', perLiterElem)

    let buttonElem = document.createElement('button')
    buttonElem.innerHTML = 'Add to cart'
    buttonElem.classList.add('btn-add')
    

    imgDivElem.append(imgElem)
    productBodyDiveElem.append(spanElem, h3Elem, productPriceElem, buttonElem)
    articalElem.append(imgDivElem, productBodyDiveElem)
    productListContainer.append(articalElem)
})