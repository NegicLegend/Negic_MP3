"use strict";

import { addActive, removeActive } from './functions.js';

const volume = document.querySelector('.volume');
let perviousVolumeValue;

function changeVolumeIcon(x) {
    const HighVolume = document.querySelector('.high-volume');
    const LowVolume = document.querySelector('.low-volume');
    const NoneVolume = document.querySelector('.none-volume');

    const VolumeIcons = document.querySelectorAll('.volume-icon i');
    
    if(x >= 50 && perviousVolumeValue < 50) {
        removeActive(VolumeIcons);
        addActive(HighVolume);
    }else if(x <= 49 && (perviousVolumeValue > 49 || perviousVolumeValue == 0) && x > 0) {
        removeActive(VolumeIcons);
        addActive(LowVolume);
    }else if(x == 0 && perviousVolumeValue > 0) {
        removeActive(VolumeIcons);
        addActive(NoneVolume);
    }
}

volume.addEventListener('input', function() {
    let currentVolumeValue = document.querySelector('.volume input').value;
    changeVolumeIcon(Number.parseInt(currentVolumeValue));
    
    const progress = document.querySelector('.volume progress');
    progress.value = currentVolumeValue;
    perviousVolumeValue = Number.parseInt(currentVolumeValue);
    document.getElementById('audio').volume = currentVolumeValue / 100;
});