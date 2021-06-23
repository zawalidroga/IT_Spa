import $ from 'jquery';
import axios from 'axios';
import {addCart} from'../basket/basket'
import { roomCart } from '../basket/room-cart'

export const rooms = () => {
    const fragment = $(document.createDocumentFragment());

    const h2 = $('<h2>Pokoje</h2>');
    // const p = $('<p>Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając</p>')
    const section = $('<section class="container">Loading...</section>');
    
    
    fragment.append(h2, section);

    //Pobieramy pokoje z json-server
    axios.get('http://localhost:3000/rooms')
        .then(response => response.data)
        .then(rooms => {
            const articles = rooms.map(room => {
                const {id, name, beds, price, guests, img} = room;
                



                const article = $(`
                <article style="cursor: pointer" class="container__item ${img}">
                    <div class="container__item__room">
                    <h4>${name}</h4>
                    <p><strong>Beds</strong> ${beds}| <strong>Guest</strong> ${guests}</p>
                    <p><strong>Price</strong> ${price.toFixed(2)} zł</p>
                    
                    
                    </div>
                </article>
                `);
                
                
                article.on('click', event => {
                    event.preventDefault();
                    

                    const navigationEvent = new CustomEvent('navigation', {
                        detail: {
                            view: 'rooms-detail',
                            roomId: id
                        }
                    });
                    document.dispatchEvent(navigationEvent);
                });



                return article;
            });
            section.empty().append(articles);
        })
        

    return fragment;
};