"use strict";

const themeBtn = document.querySelector('.theme');
const theme = document.getElementById('theme');

themeBtn.addEventListener('click', () => {
    if (theme.href.indexOf('dark') > -1) {
        theme.href = './CSS/theme/light.css';
    } else if (theme.href.indexOf('light') > -1) {
        theme.href = './CSS/theme/dark.css';
    } else {
        console.error('Something must be wrong!');
    }
})