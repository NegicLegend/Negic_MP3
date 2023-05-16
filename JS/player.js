"use strict";

import { renderPlayer, renderCollection } from './render.js';
import { displayCurrentTime } from './timeControl.js';
import { addActiveSong } from './playlist.js';
import MikuList from '../MusicInfo/miku.js';
import { waveInterval, musicWave } from './collection.js';
import { addActive, removeActive, createNewSong, changeMusic } from './functions.js';

export const currentMusic = {
    songIndex: 1,
    listIndex: 0,
    currentList: MikuList,
    isPlaying: false,
    isLooping: false,
    isChanged: false
}

document.getElementById('progress').addEventListener('mouseenter', () => {
    document.getElementById('progress').addEventListener('mousedown', () => {
        currentMusic.isChanged = true;
    })
})

document.getElementById('progress').addEventListener('mouseleave', () => {
    currentMusic.isChanged = false;
})

const audio = document.getElementById('audio');
const circle = document.querySelector('.circle-player-control');
const player = document.querySelector('.player');
const wrapper = document.querySelector('.wrapper');
let songs = document.querySelectorAll('.song');
let loadCurrentTime;

function updateTime() {
    if (currentMusic.isPlaying) {
        loadCurrentTime = setInterval(() => {
            if(audio.currentTime <= 5) {
                document.getElementById('progress').max = document.getElementById('audio').duration;
            }

            if (!currentMusic.isChanged) {
                progress.value = audio.currentTime;
            }
            document.getElementById('current-time').innerHTML = displayCurrentTime(audio.currentTime, audio.duration);
        }, 500);
    }
}

function checkPlaying() {
    if (currentMusic.isPlaying) {
        if (!wrapper.classList.contains('playing')) {
            wrapper.classList.add('playing');
            circle.classList.add('playing');
            document.querySelector('.playlist-element.active').querySelector('.playlist-play-icon').style = 'display: none;';
            document.querySelector('.playlist-element.active').querySelector('.playlist-pause-icon').style = 'display: block;';
            document.querySelector('.song-wrap.active').querySelector('.song-play-icon').style = 'display: none;';
            document.querySelector('.song-wrap.active').querySelector('.song-pause-icon').style = 'display: block;';
            if(typeof(waveInterval) != 'number') {
                musicWave();
            }
        }
    } else {
        if (wrapper.classList.contains('playing')) {
            wrapper.classList.remove('playing');
            circle.classList.remove('playing');
            document.querySelector('.playlist-element.active').querySelector('.playlist-play-icon').style = 'display: block;';
            document.querySelector('.playlist-element.active').querySelector('.playlist-pause-icon').style = 'display: none;';
            document.querySelector('.song-wrap.active').querySelector('.song-play-icon').style = 'display: block;';
            document.querySelector('.song-wrap.active').querySelector('.song-pause-icon').style = 'display: none;';
        }
    }
}

function playPause() {
    currentMusic.isPlaying = !currentMusic.isPlaying;
    if (currentMusic.isPlaying) {
        audio.play();
    } else {
        audio.pause();
    }
}

audio.addEventListener('play', ()=> {
    currentMusic.isPlaying = true;
    checkPlaying();
    updateTime();
})

audio.addEventListener('pause', ()=> {
    currentMusic.isPlaying = false;
    checkPlaying();
    clearInterval(loadCurrentTime);
})

function nextSong(index) {
    var promise = new Promise(
        function (resolve, reject) {
            resolve()
        }
    );

    promise
        .then(() => {
            currentMusic.songIndex = Number.parseInt(index);
            player.classList.add('next');
            removeActive(songs);
            addActive(songs[4]);
        })
        .then(() => {
            setTimeout(() => {
                const newSong = document.createElement('article');
                newSong.classList.add('song');
                if (currentMusic.songIndex + 3 > currentMusic.currentList.length) {
                    newSong.setAttribute('data-index', currentMusic.songIndex + 3 - currentMusic.currentList.length);
                    newSong.innerHTML = createNewSong(currentMusic.currentList[currentMusic.songIndex + 3 - currentMusic.currentList.length - 1]);
                } else {
                    newSong.setAttribute('data-index', currentMusic.songIndex + 3);
                    newSong.innerHTML = createNewSong(currentMusic.currentList[currentMusic.songIndex + 3 - 1]);
                }
                player.appendChild(newSong);
                document.querySelector('.song').remove();
                player.classList.remove('next');
                renderPlayer(currentMusic.songIndex);
            }, 500);
        })
        .catch(() => { })
}

function previousSong(index) {
    var promise = new Promise(
        function (resolve, reject) {
            resolve()
        }
    );

    promise
        .then(() => {
            currentMusic.songIndex = Number.parseInt(index);
            player.classList.add('previous');
            removeActive(songs);
            addActive(songs[2]);
        })
        .then(() => {
            setTimeout(() => {
                const newSong = document.createElement('article');
                newSong.classList.add('song');
                if (currentMusic.songIndex - 3 <= 0) {
                    newSong.setAttribute('data-index', currentMusic.songIndex - 3 + currentMusic.currentList.length);
                    newSong.innerHTML = createNewSong(currentMusic.currentList[currentMusic.songIndex - 3 + currentMusic.currentList.length - 1]);
                } else {
                    newSong.setAttribute('data-index', currentMusic.songIndex - 3);
                    newSong.innerHTML = createNewSong(currentMusic.currentList[currentMusic.songIndex - 3 - 1]);
                }
                player.insertBefore(newSong, player.firstChild);
                document.querySelector('.song').remove();
                player.classList.remove('previous');
                renderPlayer(currentMusic.songIndex);
            }, 500);
        })
        .catch(() => { })
}

function handleNextSong() {
    var promise = new Promise(
        function (resolve, reject) {
            resolve()
        }
    );

    promise
        .then(() => {
            nextSong(songs[4].getAttribute('data-index'));
        })
        .then(() => {
            changeMusic(audio, songs[4].getAttribute('data-index'), currentMusic);
        })
        .then(() => {
            audio.play();
        })
        .then(() => {
            currentMusic.isPlaying = true;
            checkPlaying();
        })
        .then(() => {
            updateTime();
        })
        .then(() => {
            addActiveSong(document.querySelectorAll('.song')[4].getAttribute('data-index') - 1);
        })
        .catch(() => { })
}

function handlePreviousSong() {
    var promise = new Promise(
        function (resolve, reject) {
            resolve()
        }
    );

    promise
        .then(() => {
            previousSong(songs[2].getAttribute('data-index'));
        })
        .then(() => {
            changeMusic(audio, songs[2].getAttribute('data-index'), currentMusic);
        })
        .then(() => {
            audio.play();
        })
        .then(() => {
            currentMusic.isPlaying = true;
            checkPlaying();
        })
        .then(() => {
            updateTime();
        })
        .then(() => {
            addActiveSong(document.querySelectorAll('.song')[2].getAttribute('data-index') - 1);
        })
        .catch(() => { })
}

function songClick() {
    songs = document.querySelectorAll('.song');
    for (let i = 0; i < songs.length - 1; i++) {
        (function (i) {
            songs[i].addEventListener('click', (e) => {
                if (e.target.closest('.thumbnail')) {
                    if (i == 4) {
                        handleNextSong();
                    } else if (i == 2) {
                        handlePreviousSong();
                    } else if (i == 3) {
                        playPause();
                    }
                }
            })
        })(i)
    }
}

function songEnd() {
    audio.addEventListener('ended', () => {
        songs = document.querySelectorAll('.song');
        clearInterval(loadCurrentTime);
        if (currentMusic.isLooping) {
            audio.play();
            updateTime();
        } else {
            document.querySelectorAll('.thumbnail')[4].click();
        }
    })
}

function resetProgess() {
    document.getElementById('progress').value = 0;
}

window.addEventListener("keydown", (e) => {
    console.log(e)
    if(e.which === 177) {
        handlePreviousSong();
    }else if(e.which === 176) {
        handleNextSong();
    }
})

for (let i = 0; i < document.querySelectorAll('.ctrl-play-pause').length; i++) {
    (function (i) {
        document.querySelectorAll('.ctrl-play-pause')[i].addEventListener('click', () => {
            playPause();
        })
    })(i)
}

for (let i = 0; i < document.querySelectorAll('.ctrl-next').length; i++) {
    (function (i) {
        document.querySelectorAll('.ctrl-next')[i].addEventListener('click', () => {
            handleNextSong();
        })
    })(i)
}

for (let i = 0; i < document.querySelectorAll('.ctrl-previous').length; i++) {
    (function (i) {
        document.querySelectorAll('.ctrl-previous')[i].addEventListener('click', () => {
            handlePreviousSong();
        })
    })(i)
}

for (let i = 0; i < document.querySelectorAll('.ctrl-loop').length; i++) {
    (function (i) {
        document.querySelectorAll('.ctrl-loop')[i].addEventListener('click', () => {
            currentMusic.isLooping = !currentMusic.isLooping;
            if (currentMusic.isLooping) {
                for (let y = 0; y < document.querySelectorAll('.ctrl-loop').length; y++) {
                    document.querySelectorAll('.ctrl-loop')[y].classList.add('active');
                }
            } else {
                for (let y = 0; y < document.querySelectorAll('.ctrl-loop').length; y++) {
                    document.querySelectorAll('.ctrl-loop')[y].classList.remove('active');
                }
            }
        })
    })(i)
}

renderCollection();

export { songClick, songEnd, playPause, resetProgess };