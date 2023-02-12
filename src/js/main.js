let products = []
let productItemStartIndex = 0

let init = () => {
    loadProducts()
    showProducts()
}

let loadProducts = () => {
    products = productsData.map(e => {
        return {
            id: e.id,
            isFavourite: e.isFavourite,
            photos: e.photos,
            name: e.name,
            priceOld: e.priceOld,
            priceNew: e.priceNew,
            count: e.count,
            isHit: e.isHit,
            isNew: e.isNew,
            imageIndex: 0
        }
    })
}

let showProducts = () => {
    let productList = document.getElementById("product-list")
    productList.innerHTML = ''
    let isMobile = screen.width < 769
    let lastIndex = isMobile ? products.length : 4
    for (let i = productItemStartIndex; i < productItemStartIndex + lastIndex; i++) {
        productList.innerHTML += getProductItemHtml(products[i], i, isMobile)
    }
}

let getProductItemHtml = (product, productItemIndex, isMobile) => {
    let left = (productItemIndex - productItemStartIndex) * 354
    let leftStyle = isMobile ? '' : `style="left: ${left}px"`

    let priceOld = product.priceNew === product.priceOld
        ? ''
        : `<p class="product__price_old">
                <span class="product__price_old-value">${product.priceOld}</span>
                <span class="product__price_old-currency">₽</span>
           </p>`


    let imageSlides = ''
    for (let j = 0; j < 5; j++) {
        if (product.imageIndex === j) {
            imageSlides += `<img onClick="changeImage(${product.id}, ${j})" src="img/image-dot-selected.svg" alt="">`
        } else {
            imageSlides += `<img onClick="changeImage(${product.id}, ${j})" src="img/image-dot.svg" alt="">`
        }
    }

    let photoSrc = product.photos[product.imageIndex]
    let hitImg = product.isHit ? `<img class="hit-product" src="img/hit.svg" alt="">` : ''
    let newImg = product.isNew ? `<img class="new-product" src="img/new.svg" alt="">` : ''
    let favouriteButtonSrc = product.isFavourite ? "img/favourite-active.svg" : "img/favourite.svg"

    return `<li class="product-item" ${leftStyle}>
                    <div class="image-slider">
                        <img class="photo" src=${photoSrc} alt=""/> 
                        <button class="favourite__button" onclick="toggleFavourite(${product.id})"><img src=${favouriteButtonSrc} alt=""></button>
                        <a href="" class="compare__button"><img src="img/compare.svg" alt=""></a>
                        ${hitImg}
                        ${newImg}
                        <div class="image__slides">
                            ${imageSlides}
                        </div>
                    </div>
                    <p class="product__name">${product.name}</p>
                    <div class="product__price">
                        <p class="product__price_new">
                            <span class="product__price_new-value">${getMoneyCurrencyString(product.priceNew)}</span>
                            <span class="product__price_new-currency">₽</span>
                        </p>
                        ${priceOld}
                    </div>
                    <div class="cart-count">
                        <div class="cart-count__count">
                            <button class="cart-count__remove-btn" onclick="countMinus(${product.id})">
                                <img src="img/minus.svg" alt=""/>
                            </button>
                            <div class="cart-count__value">${product.count}</div>
                            <button class="cart-count__add-btn" onclick="countPlus(${product.id})">
                                <img src="img/plus.svg" alt=""/>
                            </button>
                        </div>
                        <a href="" class="go-cart">
                            <img src="img/cart.svg" alt="">
                            <p>В корзину</p>
                        </a>
                    </div>
                </li>`
}

let changeImage = (productId, imageIndex) => {
    let product = getProduct(productId)
    if (imageIndex !== product.imageIndex) {
        product.imageIndex = imageIndex
        showProducts()
    }
}
let getMoneyCurrencyString = (value) => {
    let valueString = String(value);
    valueString = valueString.replace(new RegExp("^(\\d{" + (valueString.length % 3 ? valueString.length % 3 : 0)
        + "})(\\d{3})", "g"), "$1 $2").replace(/(\d{3})+?/gi, "$1 ").trim();
    return valueString
}

let getProduct = (id) => {
    return products.find(e => e.id === id)
}

let countMinus = (productId) => {
    let product = getProduct(productId)
    if (product.count === 1) return
    else {
        product.count--
        showProducts()
    }
}

let countPlus = (productId) => {
    let product = getProduct(productId)
    product.count++
    showProducts()
}

let toggleFavourite = (productId) => {
    let product = getProduct(productId)
    product.isFavourite = !product.isFavourite
    showProducts()
}


document.getElementById("arrow_prev").onclick = () => {
    if (productItemStartIndex !== 0) {
        productItemStartIndex--
        showProducts()
    }
}
document.getElementById("arrow_next").onclick = () => {
    if (productItemStartIndex !== products.length - 4) {
        productItemStartIndex++
        showProducts()
    }
}


let option0 = document.getElementById("option-0")
let option1 = document.getElementById("option-1")
let option2 = document.getElementById("option-2")

option0.onclick = () => {
    option0.className = "option__item option__item_selected"
    option1.className = "option__item"
    option2.className = "option__item"
}
option1.onclick = () => {
    option0.className = "option__item"
    option1.className = "option__item option__item_selected"
    option2.className = "option__item"
}
option2.onclick = () => {
    option0.className = "option__item"
    option1.className = "option__item"
    option2.className = "option__item option__item_selected"
}


init()
