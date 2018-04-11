/* Variables - get the elements */
const player = document.getElementById("container");
const video = document.getElementById("my_video");
const btn = player.getElementsByClassName("toggle")[0];
const btnsSkip = player.querySelectorAll("[data-skip]");
const showTime = player.getElementsByClassName("show_time")[0];
const ranges = player.querySelectorAll("input[type='range']");
const progressBar = player.querySelector(".progress_filled");
const progress = player.querySelector(".progress");
const changeVideo = document.querySelector("#local_file");
const fullscreenBtn = document.querySelector("#full_screen");
const fullscreenContainer = document.querySelector("#img_contain");
const fakeFileBtn = document.getElementById("style_file");
const textareaName = document.querySelector(".showTitle");

/* Define functions */
function togglePlay() {
    let method = video.paused ? "play" : "pause";
    video[method]();
}

function updateBtn() {
    let symbol = video.paused ? "&#9658;" : "&#10074;&#10074;";
    btn.innerHTML = symbol;
}

function skip() {
    let time = video.currentTime;
    let step = this.dataset.skip;
    let newTime = time + parseInt(step, 10);
    video.currentTime = newTime;
    video.play();
}

function updateRange() {
    video[this.name] = this.value;
}

function updateProgressBar() {
    let currentTime = video.currentTime;
    let totalTime = video.duration;
    let percentage = (currentTime / totalTime) * 100
    progressBar.style.flexBasis = percentage + "%";
}

function playProgressOnClick(e) {
    let clickedPosition = e.offsetX;
    let percentage = clickedPosition / progress.offsetWidth;
    video.currentTime = percentage * video.duration;   
}

function updateTime() {
    let time = Math.round(this.currentTime);
    let mins = Math.floor(time / 60);
    let seconds = time % 60;
    let totalTime = Math.round(this.duration);
    let totalMins = Math.floor(totalTime / 60);
    let totalSecs = totalTime % 60;
    
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (mins < 10) {
        mins = "0" + mins;
    }
    if (totalSecs < 10) {
        totalSecs = "0" + totalSecs;
    }
    if (totalMins < 10) {
        totalMins = "0" + totalMins;
    }
    
    showTime.textContent = `${mins} : ${seconds} / ${totalMins} : ${totalSecs}`;
}

function changeLocalVideo() {
    let file = changeVideo.files[0]; 
    video.setAttribute("src", URL.createObjectURL(file));
    video.load();
    video.play();
    textareaName.textContent = file.name;
    textareaName.classList.add("animate");
}

function toggleFullScreen() {
    let FSactive = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;  
    if (FSactive) {
        
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { 
            document.msExitFullscreen();
        }
        
    } else {
        
        if (player.requestFullscreen) {
            player.requestFullscreen();
        } else if (player.mozRequestFullScreen) {
            player.mozRequestFullScreen();
        } else if (player.webkitRequestFullscreen) {
            player.webkitRequestFullscreen();
        } else if (player.msRequestFullscreen) { 
            player.msRequestFullscreen();
        }

    } 
}

function toggleFSIcon() {
    let FSactive = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;  
    
    if (FSactive) {
        fullscreenContainer.classList.add("striked");
        fullscreenBtn.title = "Exit Fullscreen";
    } else {
        fullscreenContainer.classList.remove("striked");
        fullscreenBtn.title = "Fullscreen";
    }
}

/* Event Listeners */
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateBtn);
video.addEventListener("pause", updateBtn);
btn.addEventListener("click", togglePlay);
btnsSkip.forEach(btn => btn.addEventListener("click", skip));
ranges.forEach(range => range.addEventListener("change", updateRange));
ranges.forEach(range => range.addEventListener("mousemove", updateRange));
video.addEventListener("timeupdate", updateProgressBar);
video.addEventListener("timeupdate", updateTime);

let mouseDown = false;
progress.addEventListener("click", playProgressOnClick);
progress.addEventListener("mousemove", (e) => mouseDown && playProgressOnClick(e));
progress.addEventListener("mousedown", () => mouseDown = true);
progress.addEventListener("mousedown", () => mouseDown = false);

changeVideo.addEventListener("change", changeLocalVideo);
fullscreenBtn.addEventListener("click", toggleFullScreen);
fullscreenBtn.addEventListener("click", toggleFullScreen);
document.addEventListener("fullscreenchange", toggleFSIcon);
document.addEventListener("webkitfullscreenchange", toggleFSIcon);
document.addEventListener("mozfullscreenchange", toggleFSIcon);
document.addEventListener("MSFullscreenChange", toggleFSIcon);
