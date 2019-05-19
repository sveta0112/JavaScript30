/* Get Our Elements */
 {/* <div class="player"></div> */}
const player = document.querySelector(".player");
{/* <video class="player__video viewer" src="652333414.mp4"></video> */}
const video = player.querySelector(".viewer");
 {/* <div class="progress"></div> */}
const progress = player.querySelector(".progress");
{/* <div class="progress__filled"></div> */}
const progressBar = player.querySelector(".progress__filled");


{/* <button class="player__button toggle" title="Toggle Play">►</button> */}
const toggle = player.querySelector(".toggle");
{/* <button data-skip="-10" class="player__button">« 10s</button>
<button data-skip="25" class="player__button">25s »</button> */}
const skipButtons = player.querySelectorAll('[data-skip]');
{/* <input type="range" name="volume" class="player__slider" min="0" max="1" step="0.05" value="1">
<input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1"></input> */}
const ranges = player.querySelectorAll(".player__slider");

const fullscreen = player.querySelector(".fullscreen");

let isFullscreen = false;

/* Build Our Functions */
function togglePlay(){
    if(video.paused){
        video.play();
    } else {
        video.pause();
    }
}    

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    // console.log(icon);
    //toggle is our button
    toggle.textContent = icon;
}

function skip() {
    {/* this --> <button data-skip="-10" class="player__button">« 10s</button>
        dataset ---> data-skip: -10 */}
    // console.log(this.dataset.skip);
    
    video.currentTime += parseFloat(this.dataset.skip);//have to parse it, because it string
    
}


function handleRangeUpdate(){
    {/* this --> <input type="range" name="volume" class="player__slider" min="0" max="1" step="0.05" value="1"> */}
    video[this.name] = this.value;
    // console.log('name', video[this.name]);
    // console.log('value', this.value);
    //console.log(video[this.name]);
    // console.log(this.name);
    // console.log("Range this.value", this.value);
}


function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}


function scrub(e) {
    // console.log('e.offsetX', e.offsetX);
    // console.log('progress.offsetWidth',progress.offsetWidth );
    // console.log('video.duration', video.duration);
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    
}

function toggleFullscreen(e) {
    if (isFullscreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else {
        console.error("Unable to find a fullscreen exit method.");
      }
      console.log("removing fullscreen class");
    } else {
      if (player.requestFullscreen) {
        player.requestFullscreen(); // standard
      } else if (player.webkitRequestFullscreen) {
        player.webkitRequestFullscreen();
      } else if (player.mozRequestFullScreen) {
        player.mozRequestFullScreen();
      } else if (player.msRequestFullscreen) {
        player.msRequestFullscreen();
      } else {
        console.error("Unable to find a fullscreen request method");
      }
    }
  }
  
  function toggleFullscreenClasses() {
    player.classList.toggle("fullscreen");
    isFullscreen = !isFullscreen;
  }



//* Hook up the Event Listeners 
video.addEventListener("click", togglePlay);
//when video plays , trigger updateButton function change icon '❚ ❚'
video.addEventListener("play", updateButton);
//when video paused , trigger updateButton function change icon '►' 
video.addEventListener("pause", updateButton);

//handling progress bar percent
video.addEventListener("timeupdate", handleProgress);


//play/pause button update
toggle.addEventListener("click", togglePlay);

//skip buttons update
skipButtons.forEach(button => button.addEventListener("click", skip));

//ranges handling
ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate));

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);



fullscreen.addEventListener("click", toggleFullscreen);


document.addEventListener("fullscreenchange", toggleFullscreenClasses);
document.addEventListener("mozfullscreenchange", toggleFullscreenClasses);
document.addEventListener("webkitfullscreenchange", toggleFullscreenClasses);
document.addEventListener("msfullscreenchange", toggleFullscreenClasses);