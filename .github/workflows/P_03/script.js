const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// Function for event listener!
// 1- toggle video - play or pause the video .
function toggleVideo(){
    //using play and pause method
    if (video.paused){ 
        video.play();
    }else {
        video.pause();
    }
}

// 2- updateIcon - if video is playing show pause icon and if video is pause show play icon 
function updateIcon(){
    //using play and pause method
    if (video.paused){
        play.innerHTML = '<i class="fas fa-play fa-2x"></i>'
    } else {
        play.innerHTML = '<i class="fas fa-pause fa-2x"></i>'
    }

}

// 3- update progress bar and timestamp
function updateProgress(){
    // --> update peogress slider
    progress.value = video.currentTime/video.duration*100;
    // progress time is set bt 0-100%. start form zero and progress with 0.1 in HTML.
    // therefore here we update the progress bar by % formula starting from zero using current time and duration of video.

    // --> Update timestamp
    // 1-minutes
    let minutes = Math.floor(video.currentTime / 60); // math is js library
    if (minutes < 10){
        minutes = `0${minutes}`
    }
    // 2- seconds
    let seconds = Math.floor(video.currentTime % 60);
    if (seconds < 10){
        seconds = `0${seconds}`
    }
    // 3- display timestamp
    timestamp.innerHTML = `${minutes}:${seconds}`;
}

// 4- stopVideo- stop video, playback and reset time and progress bar
function stopVideo(){
    // there is no stop method therefore we use pause method and current time = 0
    video.pause();
    video.currentTime= 0;
}

// 5- setprogress- manually forwrd and reverse the video using progress bar

function setProgress(){
    video.currentTime = progress.value * video.duration / 100;
    // here we change the same % formula used for updateprogress fucntion.
}
// event listener
// 1. Video element: click to play or pause
video.addEventListener('click', toggleVideo);
// 2. Video element: pause to toggle play icon
video.addEventListener('pause', updateIcon);
// 3. Video element: play to toggle pause icon
video.addEventListener('play', updateIcon);
// 4. Video element: update progress bar and timestamp
video.addEventListener('timeupdate', updateProgress);
// 5. Play button: Click to play/pause
play.addEventListener('click', toggleVideo);
// 6. Stope button:  click to reset and pause video
stop.addEventListener('click', stopVideo);
// 7. progress bar: time change upoun position of progress bar
progress.addEventListener('change', setProgress);