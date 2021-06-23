import $ from 'jquery';
import axios from 'axios';
import {addCart} from'../basket/basket'
import { roomCart } from '../basket/room-cart'



export const roomsDetail = roomId => {
    const fragment = $(document.createDocumentFragment());
    const section = $('<section>Loading...</section>');
    

    axios.get(`http://localhost:3000/rooms/${roomId}`)
    .then(response => response.data)
    .then(room => {
        const {name, beds, guests, description, price} = room
        const article = $(`
        <article>
            <h2>${name}</h2>
            <p>${description}</p>
            <p><strong>Beds</strong> ${beds}| <strong>Guest</strong> ${guests}</p>
            <p><strong>Price</strong> ${price.toFixed(2)} zł</p>
            <div><input class="start-date" type="date" / >
                <input class="end-date" type="date" />
                <div>
                    <button type="button" class="add-cart">Dodaj do koszyka</button>
                </div>
            </div>
        </article>
        `);
        section.empty().append(article);
        
        roomCart(room);
        
    })
    
    fragment.append(section);

    return fragment;
}

