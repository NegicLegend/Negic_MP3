"use strict";

import { playPause } from './player.js';
import { removeActive, addActive } from './functions.js';
import { renderPlayer } from './render.js';
import { currentMusic } from './player.js';

function addActiveSong(index, list = document.querySelectorAll('.song-wrap')) {
    removeActive(list);
    addActive(list[index]);

    for (let y = 0; y < list.length; y++) {
        if (y != index) {
            list[y].querySelector('.song-play-icon').style = 'display: block;';
            list[y].querySelector('.song-pause-icon').style = 'display: none;';
        } else {
            list[index].querySelector('.song-play-icon').style = 'display: none;';
            list[index].querySelector('.song-pause-icon').style = 'display: block;';
        }
    }
}

function hoverSong() {
    const songList = document.querySelectorAll('.song-wrap');
    for (let i = 0; i < songList.length; i++) {
        songList[i].addEventListener('mousemove', (e) => {
            const x = e.pageX - songList[i].offsetLeft;
            const y = e.pageY - songList[i].offsetTop;

            songList[i].style.setProperty('--x', x + 'px');
            songList[i].style.setProperty('--y', y + 'px');
        })
    }
}

function activeSong() {
    const songList = document.querySelectorAll('.song-wrap');
    for (let i = 0; i < songList.length; i++) {
        songList[i].addEventListener('click', () => {
            if (songList[i].classList.contains('active')) {
                playPause();
            } else {
                currentMusic.songIndex = i + 1;
                document.getElementById('audio').src = currentMusic.currentList[currentMusic.songIndex - 1].path;
                if (!currentMusic.isPlaying) {
                    document.querySelector('.ctrl-play-pause').click();
                } else {
                    document.getElementById('audio').play();
                }
                renderPlayer(currentMusic.songIndex);
                addActiveSong(i, songList);
                document.getElementById('progress').max = document.getElementById('audio').duration;
            }
        })
    }
}

export { activeSong, hoverSong, addActiveSong };