const musicContainer = document.getElementById("music-container");
const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const audio = document.getElementById("audio");
const progressContainer = document.getElementById("progress-container");
const progressBar = document.getElementById("progress");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// step 1
// List of Songs from library
const songList = [
  "tum-ek-gorakh-dhanda-ho",
  "dard se tujh ko mere",
  "dil se teri nigah",
  "dost ghamkhwari mein meri",
  "hijar mein hum",
  "koi umeed bar nahin aati",
];

// step 2
//  Track which song is currently playing
let currentSong = 0;

// step 3
//function to update the song and images from the source folder to the DOM
function loadSong(song) {
  title.innerHTML = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

//step 6
// function to play the song
function playSong() {
  // toggle play and pause
  musicContainer.classList.add("play");
  playButton.querySelector("i.fas").classList.remove("fa-play");
  playButton.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

// step 7
// function to pause the song

function pauseSong() {
  // toggle play and pause
  musicContainer.classList.remove("play");
  playButton.querySelector("i.fas").classList.remove("fa-pause");
  playButton.querySelector("i.fas").classList.add("fa-play");

  audio.pause();
}

// step 9
// function for addeventlistener upon prevbutton
function prevSong() {
  currentSong--;

  if (currentSong < 0) {
    currentSong = songList.length - 1;
  }

  loadSong(songList[currentSong]);

  playSong();
}

// step 11
// function for addeventlistener upon nextButton
function nextSong() {
  currentSong++;

  if (currentSong > songList.length - 1) {
    currentSong = 0;
  }

  loadSong(songList[currentSong]);

  playSong();
}

// step 13:
// add function for event listener of audio in order to update time and show progress bar
function updateProgress(e) {
  const { currentTime, duration } = e.srcElement;
  const progressPercentage = (currentTime / duration) * 100;
  progressBar.style.width = ` ${progressPercentage}% `;
}

// step 15
// function for eventlistener progressCaontainer to set/update the played song time clicking on progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const offsetX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (offsetX / width) * duration;
}

// step 4
// Initial Song Load function

loadSong(songList[currentSong]);

//event listener
// step 5: play button to toggle play and pause
playButton.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// step 8 : add evernt listener for previous button
prevButton.addEventListener("click", prevSong);

// step 10 : add evernt listener for next button
nextButton.addEventListener("click", nextSong);

// step 12: progress bar
// eventlistener for audio to update the time of audio song on playing in order to show the progress bar
audio.addEventListener("timeupdate", updateProgress);

// step 14:
// forword or revers the time of played song by click on progress coantainer
progressContainer.addEventListener("click", setProgress);

// step 16
// eventlistener for automatically play next song
audio.addEventListener("ended", nextSong);
