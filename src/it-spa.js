import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
import {footer, header, main} from './common';
import {navigation} from './navigation/navigation';
import {signUp} from './sign-up/sign-up';


const body = $(document.body);

body.append(header());
// body.append(navigation());
// body.append(signUp())
body.append(main());
body.append(footer());

