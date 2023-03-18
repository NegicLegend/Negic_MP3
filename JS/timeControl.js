"use strict";

import { currentMusic, playPause } from './player.js';

function initTime() {
    if (document.getElementById('audio').duration >= 3600) {
        document.getElementById('current-time').innerHTML = '0:00:00';
    } else {
        document.getElementById('current-time').innerHTML = '0:00';
    }
}

function displayCurrentTime(currentTime, duration) {
    const now = currentTime;
    if (duration >= 3600) {
        const nowHours = Math.floor(now / 3600);
        const nowMinutes = Math.floor(now / 60) % 60;
        const nowSeconds = Math.floor(now - nowHours * 3600 - nowMinutes * 60);

        if (!isNaN(nowSeconds)) {
            if (nowMinutes >= 10) {
                if (nowSeconds >= 10) {
                    return `${nowHours}:${nowMinutes}:${nowSeconds}`
                } else {
                    return `${nowHours}:${nowMinutes}:0${nowSeconds}`
                }
            } else {
                if (nowSeconds >= 10) {
                    return `${nowHours}:0${nowMinutes}:${nowSeconds}`
                } else {
                    return `${nowHours}:0${nowMinutes}:0${nowSeconds}`
                }
            }
        }
    } else {
        const nowMinutes = Math.floor(now / 60) % 60;
        const nowSeconds = Math.floor(now - nowMinutes * 60);

        if (!isNaN(nowSeconds)) {
            if (nowSeconds >= 10) {
                return `${nowMinutes}:${nowSeconds}`
            } else {
                return `${nowMinutes}:0${nowSeconds}`
            }
        }
    }
}

document.getElementById('progress').addEventListener('change', () => {
    document.getElementById('audio').currentTime = document.getElementById('progress').value;
    if (!currentMusic.isPlaying) {
        playPause();
    }
})

export { displayCurrentTime, initTime };