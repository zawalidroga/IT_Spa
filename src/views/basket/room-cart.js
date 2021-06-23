import $ from 'jquery';
import {addCart} from'../basket/basket'


export let numberOfDays = 0

const dayCounter = (date1, date2, room) => {
    numberOfDays = Math.ceil((date2-date1)/(1000*3600*24));
    room.numberOfDays = numberOfDays;
    room.price = numberOfDays*room.price;
}



export const roomCart = (e) => {
    
    const cartBtn = document.querySelector('.add-cart');
    

    cartBtn.addEventListener('click', () => { 
        let startDate = new Date($('.start-date').val())
        let endDate = new Date($('.end-date').val())
        let today = new Date()
        
        if(startDate.setHours(0,0,0,0) < today.setHours(0,0,0,0) || endDate.setHours(0,0,0,0) < today.setHours(0,0,0,0)) {
            alert('Błędna data wyjazdu lub powrotu!')   
        } else {
            dayCounter(startDate,endDate, e);
            addCart(e);
        }
        
    })
}


