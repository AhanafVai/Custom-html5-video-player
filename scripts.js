// get elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

// build functions
const togglePlay = () => {
  const method = video.paused ? "play" : "pause";
  video[method]();
};

const updateButton = () => {
  const icon = video.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
};

skipButtons.forEach((skipButton) =>
  skipButton.addEventListener("click", () => {
    video.currentTime += parseFloat(skipButton.dataset.skip);
  })
);

ranges.forEach((range) =>
  range.addEventListener("click", () => {
    video[range.name] = range.value;
  })
);

const handleProgress = () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
};

const scrub = (e) => {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

// Event listener
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("progress", handleProgress);

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
