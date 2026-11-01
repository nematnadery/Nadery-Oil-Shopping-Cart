
// The count now lives on the copy that goes into the cart, not on the original products.
let products = [
    {id: 1, name: 'Petrol 92 Premume', price: 90, typeOfMoney: 'AFN', catagory: 'PETROL', img: 'pic/pitrol92.jpg'},
    {id: 2, name: 'Diesel 01 (Russian)', price: 82, typeOfMoney: 'AFN', catagory: 'Diesel', img: 'pic/disel01.jpg'},
    {id: 3, name: 'Engine Oil 20W-50', price: 450, typeOfMoney: 'AFN', catagory: 'Engine Oil', img: 'pic/engine-oil.jpg'},
]


let productListContainer = document.getElementById('product-list')
let cartTtemsContainer = document.getElementById('cart-items')
let overlay = document.getElementById('overlay')
let cart = document.getElementById('cart')
let cartCloseBtn = document.getElementById('cart-close')
let cartToggleBtn = document.getElementById('cart-toggle')
let cartCount = document.getElementById('cart-count')
let cartEmptyMassage = document.getElementById('cart-empty')
let toast = document.getElementById('toast')
let checkoutBtn = document.getElementById('checkout-btn')
let clearCrtBtn = document.getElementById('clear-cart-btn')
let totalBsketPrice = document.getElementById('cart-total')

let productBasketArray = []

// ADDED: keeps the toast timer so we can cancel it before starting a new one
let toastTimer


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
    buttonElem.addEventListener('click',function(){
        addProductToBasketArray(item.id)
        showToast()
    })

    imgDivElem.append(imgElem)
    productBodyDiveElem.append(spanElem, h3Elem, productPriceElem, buttonElem)
    articalElem.append(imgDivElem, productBodyDiveElem)
    productListContainer.append(articalElem)
})

function addProductToBasketArray(productId){
    // ADDED: look for the product in the cart first
    let existing = productBasketArray.find(function(item){
        return item.id === productId
    })

    if (existing) {
        // ADDED: already in the cart, so only increase its count (no duplicate row)
        existing.count++
    } else {
        let product = products.find(function(item){
            return item.id === productId
        })

        productBasketArray.push({ ...product, count: 1 })
    }

    updateCart()
}

// ADDED: changes the count of one cart item (amount is +1 or -1)
function changeCount(productId, amount){
    let item = productBasketArray.find(function(item){
        return item.id === productId
    })

    item.count += amount
    // Never go below 1; the Remove button is for deleting an item
    if (item.count < 1) item.count = 1

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
        cartMinusBtn.addEventListener('click', function(){
            changeCount(item.id, -1)
        })

        let cartQtyValue = document.createElement('span')
        cartQtyValue.classList.add('cart-qty-value')
        cartQtyValue.innerHTML = item.count

        let cartPlusBtn = document.createElement('button')
        cartPlusBtn.className = 'cart-qty-btn cart-plus'
        cartPlusBtn.innerHTML = '+'
        cartPlusBtn.addEventListener('click', function(){
            changeCount(item.id, 1)
        })

        let cartSideContainer = document.createElement('div')
        cartSideContainer.classList.add('cart-side')

        let oneCartTotalPrice = document.createElement('span')
        oneCartTotalPrice.classList.add('cart-price')
        oneCartTotalPrice.innerHTML = item.price * item.count + ' AFN'

        let cartRemoveBtn = document.createElement('button')
        cartRemoveBtn.classList.add('cart-remove')
        cartRemoveBtn.innerHTML = 'Remove'
        cartRemoveBtn.addEventListener('click', function(){
            removeProductFromBsaket(item.id)
        })

        cartQtyContainer.append(cartMinusBtn, cartQtyValue, cartPlusBtn)
        cartInfoContainer.append(cartName, cartPrice, cartQtyContainer)
        cartSideContainer.append(oneCartTotalPrice, cartRemoveBtn)
        cartItemContainer.append(cartInfoContainer, cartSideContainer)
        cartTtemsContainer.append(cartItemContainer)
    })
}

function removeProductFromBsaket(productId){
    productBasketArray = productBasketArray.filter(function(item){
        return item.id !== productId
    })
    // updateCart() also refreshes the total, the badge and the empty message.
    updateCart()
}


function calcTotalBsketPrice (userBasketProduct){
    let totalPrice = 0;
    userBasketProduct.forEach(function(item){
        totalPrice += item.price * item.count
    })

    totalBsketPrice.innerHTML = totalPrice
}

// Call it after every change to the cart.
function updateCart(){
    basketProductGenrator(productBasketArray)
    calcTotalBsketPrice(productBasketArray)

    // Badge = total quantity of all items (reduce adds up the counts)
    cartCount.textContent = productBasketArray.reduce(function(sum, item){
        return sum + item.count
    }, 0)

    // toggle(name, condition): adds "hidden" when the condition is false,
    // so the empty message shows only when the cart is empty
    cartEmptyMassage.classList.toggle('hidden', productBasketArray.length > 0)
}


// Replaces the old setInterval, which repeated forever and stacked up on every click.
function showToast(){
    toast.classList.add('show')
    clearTimeout(toastTimer)   // cancel the previous timer, if any
    toastTimer = setTimeout(function(){
        toast.classList.remove('show')
    }, 1000)
}

cartCloseBtn.addEventListener('click', function(){
    overlay.classList.toggle('show')
    cart.classList.toggle('open')
})

cartToggleBtn.addEventListener('click', function(){
    overlay.classList.toggle('show')
    cart.classList.toggle('open')
})

// ADDED: clicking the dark area behind the cart closes it
overlay.addEventListener('click', function(){
    overlay.classList.remove('show')
    cart.classList.remove('open')
})

clearCrtBtn.addEventListener('click', function(){
    productBasketArray = []

    updateCart()
})

updateCart()
