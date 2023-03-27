"use strict";

import { currentMusic, playPause } from './player.js';
import { removeActive, addActive } from './functions.js';
import { renderPlaylist, musicLists } from './render.js';

export let waveInterval;

function musicWave() {
    waveInterval = setInterval(() => {
        if (currentMusic.isPlaying) {
            const musicLines = document.querySelector('.playlist-element.active').querySelectorAll('.music-line');
            for (let i = 0; i < musicLines.length; i++) {
                musicLines[i].style.height = `${Math.random() * 20}%`
            }
        }
    }, 200)
}

function activePlaylist() {
    const playlistList = document.querySelectorAll('.playlist-element');
    for (let i = 0; i < playlistList.length; i++) {
        (function (i) {
            playlistList[i].addEventListener('click', (e) => {
                if (playlistList[i].classList.contains('active')) {
                    if (e.target.closest('.playlist-icon-wrap')) {
                        playPause();
                        if (currentMusic.isPlaying) {
                            playlistList[i].querySelector('.playlist-play-icon').style.display = 'none';
                            playlistList[i].querySelector('.playlist-pause-icon').style.display = 'block';
                        } else {
                            playlistList[i].querySelector('.playlist-play-icon').style.display = 'block';
                            playlistList[i].querySelector('.playlist-pause-icon').style.display = 'none';
                        }
                    }
                } else {
                    if(typeof(waveInterval) == 'number') {
                        clearInterval(waveInterval);
                    }
                    for (let y = 0; y < document.querySelectorAll('.music-line').length; y++) {
                        document.querySelectorAll('.music-line')[y].style.height = 0;
                    }
                    removeActive(playlistList);
                    addActive(playlistList[i]);
                    for (let y = 0; y < musicLists.length; y++) {
                        if (y == i) {
                            musicLists[y].active = true;
                            currentMusic.listIndex = y;
                        } else {
                            musicLists[y].active = false;
                        }
                    }
                    currentMusic.currentList = musicLists[i].list;
                    currentMusic.songIndex = 1;
                    document.getElementById('audio').src = currentMusic.currentList[currentMusic.songIndex - 1].path;
                    renderPlaylist();
                    currentMusic.isPlaying = false;
                    playPause();
                    playlistList[i].querySelector('.playlist-play-icon').style.display = 'none';
                    playlistList[i].querySelector('.playlist-pause-icon').style.display = 'block';
                    musicWave();
                }
            })
        })(i)
    }
}

export { musicWave, activePlaylist };