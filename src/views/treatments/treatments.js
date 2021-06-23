import $ from 'jquery';
import axios from 'axios';
import {addCart} from'../basket/basket'
import { rooms } from '../rooms/rooms';



export const treatments = () => {

    const fragment = $(document.createDocumentFragment());

    const h2 = $('<h2>Zabiegi</h2>');
    const section = $('<section class="container">Loading...</section>');
    
 
    
    fragment.append(h2, section);

    //Pobieramy pokoje z json-server
    axios.get('http://localhost:3000/treatments')
        .then(response => response.data)
        .then(treatments => {
            const articles = treatments.map(treatment => {
                const {id, name, area, time, price, img} = treatment;
                


                const article = $(`
                <article style="cursor: pointer; " class="container__item ${img}" >
                    <div class="container__item__treatment">
                    <h4>${name}</h4>
                    <p><strong>Beds</strong> ${area}| <strong>Czas zabiegu:</strong> ${time} min.</p>
                    <p><strong>Cena</strong> ${price.toFixed(2)} zł</p>
                    <button type="button" class="add-cart">Dodaj do koszyka</button>
                    </div>
                </article>
                `);


                


                return article;
            });
            section.empty().append(articles);
            addCart(treatments)
        })
        7
    return fragment;
};