import $ from 'jquery';
import {navigation} from '../navigation/navigation';


export const header = () => {


    const hdr = $(`
    <header>
        <h1>IT SPA<span>.</span></h1>
    </header>
    `);

    hdr.append(navigation())
    return hdr
};



