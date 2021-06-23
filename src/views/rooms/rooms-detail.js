import $ from 'jquery';
import axios from 'axios';
import datepicker from 'js-datepicker'


export const roomsDetail = roomId => {
    const fragment = $(document.createDocumentFragment());
    const section = $('<section>Loading...</section>');

    axios.get(`http://localhost:3000/rooms/${roomId}`)
        .then(response => response.data)
        .then(room => {
            const {name, description, beds, guests, price} = room;

            const article = $(`
                <article>
                    <h2>${name}</h2>
                    <p>${description}</p>
                    <p><strong>Beds</strong> ${beds} | <strong>Guests</strong> ${guests}</p>
                    <p><strong>Price</strong> ${price.toFixed(2)} zł</p>
                    <input type="text" class="date-start" /> <input type="text" class="date-end" />
                </article>
            `);

            section.empty().append(article);
        });

    fragment.append(section);

    return fragment;
};
