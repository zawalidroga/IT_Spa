import $ from 'jquery';
import {cartCounter} from '../views/basket/basket'
import {basket, removeStorageItem, addItemToCart} from'../views/basket/basket'



const button = text => $(`<button type="button">${text.toUpperCase()}</button>`);





const createNavigationEvent = (view) => new CustomEvent ('navigation', {
        detail: {
            view: view
        }
    });


export const navigation = () => {
    const nav = $('<nav class="main-nav"></nav>');

    

    const homeButton = button('Home');
    homeButton.on('click', function (event) {
        event.preventDefault();
        document.dispatchEvent(createNavigationEvent('home'));
        // console.log('click')
        });


    const roomsButton = button('Pokoje');
    roomsButton.on('click', function (event) {
        event.preventDefault();
        document.dispatchEvent(createNavigationEvent('rooms'));
        });


    const treatmentButton = button('Zabiegi');
    treatmentButton.on('click', function (event) {
        event.preventDefault();
        document.dispatchEvent(createNavigationEvent('treatments'));
        });


    const basketButton = $(`<button type="button" class=""><ion-icon name="cart"></ion-icon></button>`);
    basketButton.on('click', function (event) {
        event.preventDefault();
        addItemToCart()
        const cartContainer = document.querySelector('.cart-container');

        cartContainer.classList.toggle('active')
        cartContainer.classList.toggle('unactive')

        removeStorageItem()
    });

        nav.append(homeButton, roomsButton, treatmentButton, basketButton, basket());
        
        

    return nav;
}
