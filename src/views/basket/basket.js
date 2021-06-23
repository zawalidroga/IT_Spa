import $ from 'jquery';


export let cartCounter = 0;


export const onLoadCartNumber = () => {
cartCounter = localStorage.getItem('cartNumbers');

if(!cartCounter){
    cartCounter = 0
}
return cartCounter
};


const cartNumber = (e, num = 1) => {
    cartCounter = localStorage.getItem('cartNumbers');
    cartCounter = parseInt(cartCounter);
    
    if (cartCounter) { 
        
        localStorage.setItem('cartNumbers', cartCounter + (num*1))
    } else {
    
    localStorage.setItem('cartNumbers', 1)
    }

    selectItem(e, num);
    };

    const selectItem = (e, num = 1) => {
        let cartItems =localStorage.getItem('productInCart');
        cartItems = JSON.parse(cartItems);
        if(num < 0) {
            cartItems[e.name].inCart = cartItems[e.name].inCart - num;
        } else {
        if (cartItems != null ) {
            if (cartItems[e.name] == undefined) {
                e.inCart = 1;
                cartItems = {
                    ...cartItems,
                    [e.name] : e
                }   
            } else{
                    cartItems[e.name].inCart++;
            }
        
        } else {
            e.inCart = 1;
            cartItems = {
                [e.name] : e
            }
        }
    }
        localStorage.setItem('productInCart', JSON.stringify(cartItems));
    }

    const totalCost = (e, num = 1) => {
        let cartCost = localStorage.getItem('totalCost');

        if (cartCost != null) {
            cartCost = parseInt(cartCost);
            localStorage.setItem('totalCost', cartCost + (num*e))
        } else {
            localStorage.setItem('totalCost', e);
        }
    }

const totalCostLoad = () =>{
    let cost = localStorage.getItem('totalCost');
    cost = JSON.parse(cost);
    $('.cart-container__footer').html(`Cena całkowita: ${cost}.00 zł`)
}
    
export const addCart = (e) => {
    const carts = document.querySelectorAll('.add-cart');

    if (carts.length > 1) {
    for (let i = 0; i < carts.length; i++) {
        carts[i].addEventListener('click', () => {
                    cartNumber(e[i])
                    totalCost(e[i].price)
                    onLoadCartNumber()
                    totalCostLoad()
                    addItemToCart()
                    removeStorageItem()
        });
    };
    } else {
        

        carts[0].addEventListener('click', () => {
            console.log(e)
            cartNumber(e)
            totalCost(e.price)
            totalCostLoad()
            addItemToCart()
            removeStorageItem()
        }) 
    }
};

export const basket = () => {
    let cost = localStorage.getItem('totalCost');
    cost = JSON.parse(cost);

    const fragment = $(document.createDocumentFragment());
    const h2 = $(`<h2>Koszyk</h2>`);
    const btn =$(`<button class="btn-cart-close"><ion-icon name="close-outline"></ion-icon></button>`);
    const cartMain = $(`<div class="cart-container__main">Brak artykułów w koszuku</div>`);
    const cartFooter = $(`<div class="cart-container__footer">Cena całkowita: ${cost}.00 zł</div>`);
    const cartContainer = $(
        `<div class="cart-container unactive">       
        </div>`
    );
    
    cartContainer.append(h2, btn, cartMain, cartFooter);
    fragment.append(cartContainer);

    

    btn.on('click', function () {
        document.querySelector('.cart-container').classList.toggle('unactive')
    });    
    return fragment;
};

export const removeStorageItem = () => {
    const deleteBtn = document.querySelectorAll('.btn-item-delete');

    for (let i = 0; i < deleteBtn.length; i++) {

        deleteBtn[i].addEventListener('click', function() {

            const cartItemName = $(this).siblings('.item-name').text();
            let cartItem = localStorage.getItem('productInCart');
            cartItem = JSON.parse(cartItem);
            const { [cartItemName]: cartItemObj } = cartItem;

            cartNumber(cartItemObj, -cartItemObj.inCart);
            totalCost(cartItemObj.price, -cartItemObj.inCart)

            delete cartItem[cartItemName];
            localStorage.removeItem('productInCart');
            cartItem = JSON.stringify(cartItem);
            localStorage.setItem('productInCart', cartItem);

            $(this).closest('.cart-container__main__item').remove();
            totalCostLoad();
        });
    };
}

export const addItemToCart = () => {

    let cartItems = localStorage.getItem('productInCart');
    cartItems = JSON.parse(cartItems);
    const cartMain = document.querySelector('.cart-container__main')
    if (cartItems) {
        cartMain.innerHTML = '';
        Object.values(cartItems).map(cartItem => {
            
            const cartProduct = `<div class="cart-container__main__item">
            <button class="btn-item-delete"><ion-icon name="close-circle"></ion-icon></button>
            <div class="img ${cartItem.img}"></div> 
            <h3 class="item-name">${cartItem.name}</h3>
            <div>
            Cena: ${cartItem.price}.00 zł
            </div>
            <div>
            Ilość: ${cartItem.inCart}
            </div>
            </div>`;
            cartMain.innerHTML += cartProduct
        });        
    };

    
    };




onLoadCartNumber()