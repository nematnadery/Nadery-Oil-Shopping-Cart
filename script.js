let products = [
    {id: 1, name: 'Petrol 92 Premume', price: 90, typeOfMoney: 'AFN', catagory: 'PETROL', img: 'pic/pitrol92.jpg'},
    {id: 2, name: 'Diesel 01 (Russian)', price: 82, typeOfMoney: 'AFN', catagory: 'Diesel', img: 'pic/disel01.jpg'},
    {id: 3, name: 'Engine Oil 20W-50', price: 450, typeOfMoney: 'AFN', catagory: 'Engine Oil', img: 'pic/engine-oil.jpg'},
]


let productListContainer = document.getElementById('product-list')
let cartTtemsContainer = document.getElementById('cart-items')
let cartCloseBtn = document.getElementById('cart-close')
let overlay = document.getElementById('overlay')
let cartToggleBtn = document.getElementById('cart-toggle')


let productBasketArray = []

///// Step one: Create our HTML tempelete////////
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
    buttonElem.addEventListener('click', function(){
        addProductToBasketArray(item.id)
    })
    

    imgDivElem.append(imgElem)
    productBodyDiveElem.append(spanElem, h3Elem, productPriceElem, buttonElem)
    articalElem.append(imgDivElem, productBodyDiveElem)
    productListContainer.append(articalElem)
})

/////////Step Two: Add Product To The User Basket//////////

function addProductToBasketArray(productId){
    // Look for the product in the cart first
    let existing = productBasketArray.find(function(item){
        return item.id === productId
    })

    if (existing) {
        // if already in the cart, so only increase its count (no duplicate row)
        existing.count++
    } else {
        let product = products.find(function(item){
            return item.id === productId
        })
        
        productBasketArray.push({ ...product, count: 1 })
    }
    updateCart()

    
}

function basketProductGenrator (userBasketArray){
    cartTtemsContainer.innerHTML = ''
    userBasketArray.forEach(function(item){
        let cartItemContainer = document.createElement('li')
        cartItemContainer.classList.add('cart-item')

        let cartInfoContainer = document.createElement('div')
        cartInfoContainer.classList.add('cart-info')
        
        let cartName = document.createElement('span')
        cartName.classList.add('cart-name')
        cartName.textContent = item.name

        let cartPrice = document.createElement('span')
        cartPrice.classList.add('cart-unit')
        cartPrice.textContent = item.price + ' AFN / liter'

        let cartQtyContainer = document.createElement('div')
        cartQtyContainer.classList.add('cart-qty')

        let cartMinusBtn = document.createElement('button')
        cartMinusBtn.className = 'cart-qty-btn cart-minus'
        cartMinusBtn.innerHTML = '-'
       

        let cartQtyValue = document.createElement('span')
        cartQtyValue.classList.add('cart-qty-value')
        // CHANGED: was a fixed 1, now the real count of this item
        cartQtyValue.innerHTML = item.count

        let cartPlusBtn = document.createElement('button')
        cartPlusBtn.className = 'cart-qty-btn cart-plus'
        cartPlusBtn.innerHTML = '+'
        

        let cartSideContainer = document.createElement('div')
        cartSideContainer.classList.add('cart-side')

        let oneCartTotalPrice = document.createElement('span')
        oneCartTotalPrice.classList.add('cart-price')
        // CHANGED: was item.price * 2 (a fixed number)
        oneCartTotalPrice.innerHTML = item.price * item.count + ' AFN'

        let cartRemoveBtn = document.createElement('button')
        cartRemoveBtn.classList.add('cart-remove')
        cartRemoveBtn.innerHTML = 'Remove'
    
        cartQtyContainer.append(cartMinusBtn, cartQtyValue, cartPlusBtn)
        cartInfoContainer.append(cartName, cartPrice, cartQtyContainer)
        cartSideContainer.append(oneCartTotalPrice, cartRemoveBtn)
        cartItemContainer.append(cartInfoContainer, cartSideContainer)
        cartTtemsContainer.append(cartItemContainer)
    })
}

function updateCart(){
    basketProductGenrator(productBasketArray)
    
}

cartCloseBtn.addEventListener('click', function(){
    overlay.classList.toggle('show')
    cart.classList.toggle('open')
})

cartToggleBtn.addEventListener('click', function(){
    overlay.classList.toggle('show')
    cart.classList.toggle('open')
})

//  clicking the dark area behind the cart closes it
overlay.addEventListener('click', function(){
    overlay.classList.remove('show')
    cart.classList.remove('open')
})
