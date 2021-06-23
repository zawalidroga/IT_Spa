import $ from 'jquery';
import {home, rooms, roomsDetail} from '../views'
import {treatments} from'../views/treatments/treatments'
// import {basket} from'../views/basket/basket'


export const main = () => {
    const section = $('<section></section>');
    section.append(home());
    // section.append(basket())
    
    document.addEventListener('navigation', event => {
        const detail = event.detail;

        switch (detail.view) {
            case 'home':
                section.empty().append(home());
                break;
            case 'rooms':
                section.empty().append(rooms());
                break;
            case 'rooms-detail':
                section.empty().append(roomsDetail(detail.roomId));
                break;
            case 'treatments':
                section.empty().append(treatments());
                break;
            // case 'basket':
            //     // section.append(basket());
            //     const mainCart = document.querySelector('.cart-container');

            //     if (mainCart.style.right !== '0px') {
            //         mainCart.style.right = '0px'
            //     } else {
            //         mainCart.style.right = '-300px'
            //     }

            //     break;
            default:
                section.empty().append('coś poszło nie tak :(');
        }
    });

    return $(`<main class="main-container"></main>`).append(section);
};

