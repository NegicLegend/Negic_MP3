"use strict";

import NightcoreList from '../MusicInfo/nightcore.js';
import MikuList from '../MusicInfo/miku.js';
import AimerList from '../MusicInfo/aimer.js';
import ASMRList from '../MusicInfo/asmr.js';
import OSTList from '../MusicInfo/ost.js';
import HololiveList from '../MusicInfo/hololive.js';
import { activePlaylist } from './collection.js';
import { initTime } from './timeControl.js';
import { loadSongInfo } from './functions.js';
import { activeSong, hoverSong } from './playlist.js';
import { currentMusic, songClick, songEnd, resetProgess } from './player.js';

const musicLists = [
    {
        list: MikuList,
        name: 'Hatsune Miku',
        image: './IMG/playlist/1.jpg',
        active: true
    },
    {
        list: NightcoreList,
        name: 'Nightcore',
        image: './IMG/playlist/2.jpg',
        active: false
    },
    {
        list: AimerList,
        name: 'Aimer',
        image: './IMG/playlist/3.jpg',
        active: false
    },
    {
        list: ASMRList,
        name: 'ASMR',
        image: './IMG/playlist/4.jpg',
        active: false
    },
    {
        list: OSTList,
        name: 'OST',
        image: './IMG/playlist/5.jpg',
        active: false
    },
    {
        list: HololiveList,
        name: 'Hololive',
        image: './IMG/playlist/6.jpg',
        active: false
    }
]

function songPlayerElement(active, song) {
    if (active) {
        return `
            <article class="song active" data-index="${song.index}">
                <div class="details">
                    <div class="song-name">${song.name}</div>
                    <div class="song-singer">${song.author}</div>
                </div>
                <div class="thumbnail">
                    <img src="${song.image}" alt="${song.name}">
                    <div class="thumbnail-ctrl">
                        <div>
                            <i class="fa-solid fa-play play-icon"></i>
                            <i class="fa-solid fa-pause pause-icon" style="display: none;"></i>
                        </div>
                    </div>
                </div>
            </article>
        `
    } else {
        return `
            <article class="song" data-index="${song.index}">
                <div class="details">
                    <div class="song-name">${song.name}</div>
                    <div class="song-singer">${song.author}</div>
                </div>
                <div class="thumbnail">
                    <img src="${song.image}" alt="${song.name}">
                    <div class="thumbnail-ctrl">
                        <div>
                            <i class="fa-solid fa-play"></i>
                        </div>
                    </div>
                </div>
            </article>
        `
    }
}

function songPlaylistElement(active, song) {
    const html = [];
    if (active) {
        return `
            <div class="song-wrap active">
                <span>
                    <div class="song-thumbnail">
                        <img src="${song.image}" alt="${song.name}">
                    </div>
                    <div class="song-infomation">
                        <div class="song-name">${song.name}</div>
                        <div class="song-author">${song.author}</div>
                    </div>
                    <i class="fa-regular fa-circle-play song-play-icon"></i>
                    <i class="fa-regular fa-circle-pause song-pause-icon" style="display: none;"></i>
                </span>
            </div>
        `
    }else {
        return `
            <div class="song-wrap">
                <span>
                    <div class="song-thumbnail">
                        <img src="${song.image}" alt="${song.name}">
                    </div>
                    <div class="song-infomation">
                        <div class="song-name">${song.name}</div>
                        <div class="song-author">${song.author}</div>
                    </div>
                    <i class="fa-regular fa-circle-play song-play-icon"></i>
                    <i class="fa-regular fa-circle-pause song-pause-icon" style="display: none;"></i>
                </span>
            </div>
        `
    }
}

function playlistElement(active, playlist) {
    if (active) {
        return `
            <div class="playlist-wrap">
                <div class="playlist-element active">
                    <div class="playlist-thumbnail">
                        <img src="${playlist.image}" alt="${playlist.name} thumbnail">
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="playlist-icon-wrap">
                            <i class="fa-solid fa-play playlist-play-icon"></i>
                            <i class="fa-solid fa-pause playlist-pause-icon" style="display: none;"></i>
                        </div>
                    </div>
                    <div class="playlist-name">${playlist.name}</div>
                </div>
            </div>
        `
    }else {
        return `
            <div class="playlist-wrap">
                <div class="playlist-element">
                    <div class="playlist-thumbnail">
                        <img src="${playlist.image}" alt="${playlist.name} thumbnail">
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="music-line"></div>
                        <div class="playlist-icon-wrap">
                            <i class="fa-solid fa-play playlist-play-icon"></i>
                            <i class="fa-solid fa-pause playlist-pause-icon" style="display: none;"></i>
                        </div>
                    </div>
                    <div class="playlist-name">${playlist.name}</div>
                </div>
            </div>
        `
    }
}

function renderPlayer(nowSong = 1) {
    const html = [];
    for (let i = nowSong - 3; i <= nowSong + 3; i++) {
        if (i == nowSong) {
            html.push(songPlayerElement(true, currentMusic.currentList[i - 1]))
        } else {
            if (i > currentMusic.currentList.length) {
                if(currentMusic.currentList[i - currentMusic.currentList.length - 1]) {
                    html.push(songPlayerElement(false, currentMusic.currentList[i - currentMusic.currentList.length - 1]))
                }
            } else if (i <= 0) {
                if(currentMusic.currentList[i + currentMusic.currentList.length - 1]) {
                    html.push(songPlayerElement(false, currentMusic.currentList[i + currentMusic.currentList.length - 1]))
                }
            } else {
                if(currentMusic.currentList[i - 1]) {
                    html.push(songPlayerElement(false, currentMusic.currentList[i - 1]))
                }
            }
        }
    }
    document.querySelector('.player').innerHTML = html.join('\n');
    songClick();
    songEnd();
    initTime();
    resetProgess()
    loadSongInfo(currentMusic.currentList[currentMusic.songIndex - 1]);
    setTimeout(() => {
        document.getElementById('progress').max = document.getElementById('audio').duration;
    }, 100)
}

function renderPlaylist() {
    const html = [];
    for(let i = 0; i < currentMusic.currentList.length; i++) {
        if(i == currentMusic.songIndex - 1) {
            html.push(songPlaylistElement(true, currentMusic.currentList[i]));
        }else {
            html.push(songPlaylistElement(false, currentMusic.currentList[i]));
        }
    }
    document.querySelector('.playlist').innerHTML = html.join('\n');
    activeSong();
    hoverSong();
    renderPlayer();
}

function renderCollection() {
    const html = [];
    for(let i = 0; i < musicLists.length; i++) {
        if(musicLists[i].active) {
            html.push(playlistElement(true, musicLists[i]));
        }else {
            html.push(playlistElement(false, musicLists[i]));
        }
    }
    document.querySelector('.folder-menu').innerHTML = html.join('\n');
    renderPlaylist();
    activePlaylist();
}

export { renderPlaylist, renderPlayer, renderCollection, musicLists };