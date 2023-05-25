let clickState_power = 1;
document.getElementById('powerButton').onmousedown = (e) => {
    if (!clickState_power) {
        document.getElementById('bgMenu').style.opacity = '0';
        document.getElementById('bgMenu').style.zIndex = '0';
        document.getElementById('bgMenu').style.transform = 'translateY(-100px)';
        document.getElementById('windowManager').style.opacity = '1';
        // document.getElementById('windowManager').style.filter = 'none';
        clickState_power = 1;
    } else {
        document.getElementById('bgMenu').style.opacity = '1';
        document.getElementById('bgMenu').style.zIndex = '1';
        document.getElementById('bgMenu').style.transform = 'none';
        // document.getElementById('windowManager').style.filter = 'blur(10px) brightness(0.5)';
        document.getElementById('windowManager').style.opacity = '0.5';
        clickState_power = 0;
    }
}

let osInfo = document.getElementById("osInfo");
let timeEle = document.getElementById("time");

let audioPlayer = document.getElementById("audioPlayer");
let playButton = document.getElementById("playButton");
let nextButton = document.getElementById("nextButton");
let prevButton = document.getElementById("prevButton");
let scammed = document.getElementById("scammed");
let buttonClass = document.getElementsByClassName("button");
let playingTime = document.getElementById("playingTime");
let fullTime = document.getElementById("fullTime");
let nowPlaying = document.getElementById("nowPlaying");
let audio = document.getElementById("lightdelight");
let thumbnail = document.getElementById("thumbnail");
let sysinfo = document.getElementById("sysinfo");
let node = document.getElementById("node");

audio.volume = 0.3;

let isPlayingAnimation = 0;

dragSlider(node);

Array.from(document.getElementsByClassName('windowContainer')).forEach(element => {
    // console.log(element);
    dragElement(element);
    minimize(element, document.getElementById(element.id + '-icon'));
    animationInsert(element);
});

playButton.onclick = () => {
    if (audio.paused || audio.ended) {
        audio.play();
        playButton.style.backgroundImage = 'url(./static/pause.svg)';
    } else {
        audio.pause();
        playButton.style.backgroundImage = 'url(./static/play.svg)';
    }
}

nextButton.onclick = () => {
    if (!isPlayingAnimation) {
        popup();
    }
}

prevButton.onclick = () => {
    if (!isPlayingAnimation) {
        popup();
    }
}

popup = () => {
    isPlayingAnimation = 1;
    scammed.style.animationName = 'popup';
    setTimeout(() => {
        isPlayingAnimation = 0;
        scammed.style.animationName = 'none';
    }, 2000);
}

onTime = () => {
    let today = new Date();
    let date = today.toDateString();
    let time = today.toLocaleTimeString();

    timeEle.innerHTML = `${time}`;

    playingTime.innerHTML = `${fmtMSS(Math.ceil(audio.currentTime))}`;
    fullTime.innerHTML = `${fmtMSS(Math.ceil(audio.duration))}`;
    thumbnail.style.transform = `rotate(${audio.currentTime / audio.duration * 1440}deg)`;
    if (!isDragging) {
        nowPlaying.style.width = `${6 + audio.currentTime / audio.duration * parseInt(getComputedStyle(document.getElementById('slider')).width)}px`;
        node.style.left = `${audio.currentTime / audio.duration * parseInt(getComputedStyle(document.getElementById('slider')).width)}px`
    }
    if (audio.ended) {
        playButton.style.backgroundImage = 'url(./static/play.svg)';
    }

    setTimeout(onTime, 100);
}

function fmtMSS(s) { return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s }
