
// The count now lives on the copy that goes into the cart, not on the original products.
let products = [
    {id: 1, name: 'Petrol 92 Premume', price: 90, typeOfMoney: 'AFN', catagory: 'PETROL', img: 'pic/pitrol92.jpg'},
    {id: 2, name: 'Diesel 01 (Russian)', price: 82, typeOfMoney: 'AFN', catagory: 'Diesel', img: 'pic/disel01.jpg'},
    {id: 3, name: 'Engine Oil 20W-50', price: 450, typeOfMoney: 'AFN', catagory: 'Engine Oil', img: 'pic/engine-oil.jpg'},
]


let productListContainer = document.getElementById('product-list')
let cartItemsContainer = document.getElementById('cart-items')
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
    productListContainer.insertAdjacentHTML('beforeend', `
    <article class="product-card">
        <div class="product-img petrol">
            <img src="${item.img}" alt="${item.name}">
        </div>
        <div class="product-body">
            <span class="product-category">${item.catagory}</span>
            <h3 class="product-name">${item.name}</h3>
            <div class="product-price">
                <strong>${item.price}</strong> ${item.typeOfMoney} <span>/ liter</span>
            </div>
            <button type="button" class="btn-add" onclick="addProductToBasketArray(${item.id}); showToast()">Add to cart</button>
        </div>
    </article>
`)
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
    cartItemsContainer.innerHTML = ''
    userBasketArray.forEach(function(item){
cartItemsContainer.insertAdjacentHTML('beforeend', `
    <li class="cart-item">
        <div class="cart-info">
            <span class="cart-name">${item.name}</span>
            <span class="cart-unit">${item.price} AFN / liter</span>
            <div class="cart-qty">
                <button type="button" class="cart-qty-btn cart-minus" onclick="changeCount(${item.id}, -1)">-</button>
                <span class="cart-qty-value">${item.count}</span>
                <button type="button" class="cart-qty-btn cart-plus" onclick="changeCount(${item.id}, 1)">+</button>
            </div>
        </div>
        <div class="cart-side">
            <span class="cart-price">${item.price * item.count} AFN</span>
            <button type="button" class="cart-remove" onclick="removeProductFromBsaket(${item.id})">Remove</button>
        </div>
    </li>
`)
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
