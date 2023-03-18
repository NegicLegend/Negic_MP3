"use strict";

function addActive(element) {
    element.classList.add('active');
}

function changeMusic(audio, songIndex, music) {
    audio.src = music.currentList[songIndex - 1].path;
}

function removeActive(elementList) {
    for (let i = 0; i < elementList.length; i++) {
        if (elementList[i].classList.contains('active')) {
            elementList[i].classList.remove('active');
        }
    }
}

function createNewSong(details) {
    const song = `
        <div class="details">
            <div class="song-name">${details.name}</div>
            <div class="song-singer">${details.author}</div>
        </div>
        <div class="thumbnail">
            <img src="${details.image}" alt="${details.name}">
            <div class="thumbnail-ctrl">
                <div>
                    <i class="fa-solid fa-play"></i>
                </div>
            </div>
        </div>
        `
    return song;
}

function loadSongInfo(song) {
    document.querySelector('.name.song-name').innerHTML = song.name;
    document.querySelector('.name.song-author').innerHTML = song.author;
}

export { addActive , removeActive, createNewSong, changeMusic, loadSongInfo };