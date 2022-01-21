const container = document.getElementById("container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const audioEl = document.getElementById("audio");
const start = document.getElementById("start");
const end = document.getElementById("end");
const progressContainer = document.getElementById("progress-container");
const progressEl = document.getElementById("progress");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const range = document.getElementById("range");

// music name
const songs = [
  "Adele - Rolling In The Deep",
  "Billie Eilish - I Don t Relate To You",
  "Fearless Pt II (feat Chris Linton) - TULE",
  "Macklemore - Can t hold us",
  "Mask Off",
];

// songIndex
let songIndex = 0;

loadSong(songs[songIndex]);

function loadSong(song) {
  title.textContent = song;
  audioEl.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jfif`;
}

console.log(1);
// function
function playSong() {
  container.classList.add("play");
  playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
  audioEl.play();
}
function pauseSong() {
  container.classList.remove("play");
  playBtn.innerHTML = `<i class="fas fa-play"></i>`;
  audioEl.pause();
}

function nextMusic() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  audioEl.play();
}
function prevMusic() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  audioEl.play();
}
function progress(e) {
  const duration = e.srcElement.duration;
  const curTime = e.srcElement.currentTime;
  const presentageWidth = (curTime / duration) * 100;
  progressEl.style.width = `${presentageWidth}%`;

  let endMinutes = Math.floor(duration / 60);
  let endSecondes = Math.floor(duration % 60);
  end.textContent = `${endMinutes}:${(endSecondes =
    endSecondes < 10 ? "0" + endSecondes : endSecondes)}`;

  // start time
  let startMinutes = Math.floor(curTime / 60);
  let startSecondes = Math.floor(curTime % 60);
  start.textContent = `${startMinutes}:${(startSecondes =
    startSecondes < 10 ? "0" + startSecondes : startSecondes)}`;
}
function setProgress(e) {
  const width = this.clientWidth;
  const widthX = e.offsetX; 
  const duration = audioEl.duration; 
  audioEl.currentTime = (widthX / width) * duration; 
}

function changeVolume(e) {
  let volumeMusic = +range.value / +range.max;
  audioEl.range = volumeMusic;
}
// events
playBtn.addEventListener("click", () => {
  const isPlaying = container.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

nextBtn.addEventListener("click", nextMusic);
prevBtn.addEventListener("click", prevMusic);
audioEl.addEventListener("timeupdate", progress);
range.addEventListener("input", changeVolume);
progressContainer.addEventListener("click", setProgress);
