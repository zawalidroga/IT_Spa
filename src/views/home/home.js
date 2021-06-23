import $ from 'jquery';

export const home = () => {
    const fragment = $(document.createDocumentFragment());

    const main = $(
        `<div class="home-container">
        <div class="home-container__txt"><h2>Explore yourself</h2></div>
        <div class="home-container__img"> </div>
        </div>`
        );
    const p = $(`<p class="home-txt">Poznaj jeden z najpiękniejszych hoteli SPA w Polsce - Hotel Bukowy Park w Polanicy-Zdroju. Dzięki swojej lokalizacji Hotel jest idealnym miejscem dla osób ceniących sobie spokój i kontakt z naturą, amatorów zwiedzania, jak również miłośników aktywnego wypoczynku</p> `)
    fragment.append(main,p);
    return fragment;
};