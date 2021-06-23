import $ from 'jquery';
import axios from 'axios';
import {reqired, required} from './required';
import {short} from './short';
import {match} from './match';


const validate = (validation, errorMessage) => {
    validation ? errorMessage.show() : errorMessage.hide();
};


export const signUp = () => {
    const fragment = $(document.createDocumentFragment());
    const h2 = $('<h2>Sign up</h2>');
    const form = $(`
        <form name="signUp" autocomplete="off" novalidate>
            <div class="form-group">
                <label for="login">Login</label>
                <input id="login" class="form-control" type="text">
                <p id="login-required" class="text-danger">Login is required.</p>
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input id="password" class="form-control" type="password">
                <p id="password-required" class="text-danger">Password is required.</p>
                <p id="password-short" class="text-danger">Password is too short.</p>
            </div>
            
            <div class="form-group">
                <label for="repeat-password">Repeat password</label>
                <input id="repeat-password" class="form-control" type="password">
                <p id="repeat-password-match" class="text-danger">Passwords don't match.</p>
            </div>

            <button class="btn btn-primary" type="button">Sign up</button>
        </form>
    `);

    const button = form.find('button');

    const errorMessages = {
        login: {
            required: form.find('#login-required')
        },
        password: {
            required: form.find('#password-required'),
            short: form.find('#password-short')
        },
        repeatPassword: {
            match: form.find('#repeat-password-match')
        }
    };

    errorMessages.login.required.hide();
    errorMessages.password.required.hide();
    errorMessages.password.short.hide();
    errorMessages.repeatPassword.match.hide();

    button.on('click', event => {
        const login = $('#login').val();
        const password = $('#password').val();
        const repeatPassword = $('#repeat-password').val();
        const isLoginRequired = required(login);
        const isPasswordRequired = required(password);
        const isPasswordShort = short(password);
        const isPasswordMatched = match(password, repeatPassword);

        validate(isLoginRequired, errorMessages.login.required);
        validate(isPasswordRequired, errorMessages.password.required);
        validate(isPasswordShort, errorMessages.password.short);
        validate(isPasswordMatched, errorMessages.repeatPassword.match);

        if (!isLoginRequired && !isPasswordRequired && !isPasswordShort && !isPasswordMatched) {
            const data = {
                l: login,
                p: password,
                newUser: true
            };
    
            axios.post('http://localhost:3000/users', data).then(console.log);
            
            // CZYSCIMY WSZYSTKIE INPUTY
            $('#login').prop('value', '');
            $('#password').prop('value', '');
            $('#repeat-password').prop('value', '');
        }
    });

    fragment.append(h2, form);

    return fragment;
};
