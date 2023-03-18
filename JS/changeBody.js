"use strict";

import { addActive, removeActive } from "./functions.js";

const displayButtons = document.querySelectorAll('.display-btn');

const currentBody = [
    {
        name: 'Player',
        active: true
    },
    {
        name: 'Playlist',
        active: false
    },
    {
        name: 'Collections',
        active: false
    }
]

function handleChangeBody(index) {
    document.querySelector('.body').scrollTop = 0;
    removeActive(displayButtons);
    addActive(displayButtons[index]);

    for (let j = 0; j < currentBody.length; j++) {
        if (j == index) {
            currentBody[j].active = true;
        } else {
            currentBody[j].active = false;
        }
    }

    changeBody();
}

function changeBody() {
    removeActive(document.querySelectorAll('.body-child'));
    for (let i = 0; i < currentBody.length; i++) {
        if (currentBody[i].active) {
            addActive(document.querySelectorAll('.body-child')[i]);
            if (i != 0) {
                document.querySelector('.circle-player-control').classList.remove('active');
                document.querySelector('.player-control').classList.add('active');
            } else {
                document.querySelector('.circle-player-control').classList.add('active');
                setTimeout(() => {
                    document.querySelector('.player-control').classList.remove('active');
                }, 300)
            }
        }
    }
} 

document.querySelector('.left-arrow').addEventListener('click', () => {
    for (let i = 0; i < currentBody.length; i++) {
        if (currentBody[i].active) {
            if (i == 0) {
                handleChangeBody(2);
                break;
            } else {
                handleChangeBody(i - 1);
                break;
            }
        }
    }
})

document.querySelector('.right-arrow').addEventListener('click', () => {
    for (let i = 0; i < currentBody.length; i++) {
        if (currentBody[i].active) {
            if (i == 2) {
                displayButtons[0].click();
                break;
            } else {
                displayButtons[i + 1].click();
                break;
            }
        }
    }
})

for (let i = 0; i < displayButtons.length; i++) {
    (function (i) {
        displayButtons[i].addEventListener('click', function () {
            if (!displayButtons[i].classList.contains('active')) {
                handleChangeBody(i);
            }
        })
    })(i)
}