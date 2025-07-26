const piece = document.getElementById("puzzle-piece");
const hole = document.getElementById("puzzle-hole");
const container = document.getElementById("captcha-container");

let offsetX, offsetY;
let isDragging = false;

piece.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.offsetX;
  offsetY = e.offsetY;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    piece.style.left = e.pageX - offsetX + "px";
    piece.style.top = e.pageY - offsetY + "px";
  }
});

document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;

    const pieceRect = piece.getBoundingClientRect();
    const holeRect = hole.getBoundingClientRect();

    const dx = (pieceRect.left + pieceRect.width / 2) - (holeRect.left + holeRect.width / 2);
    const dy = (pieceRect.top + pieceRect.height / 2) - (holeRect.top + holeRect.height / 2);

    const threshold = 30;

    if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) {
      const containerRect = container.getBoundingClientRect();

      const left = holeRect.left - containerRect.left;
      const top = holeRect.top - containerRect.top;

      piece.style.left = `${left}px`;
      piece.style.top = `${top}px`;

      setTimeout(triggerWaveEffect, 300);
    }
  }
});

function triggerWaveEffect() {
  const wave = document.getElementById("wave");
  const ripple = document.getElementById("ripple");

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  ripple.style.left = `${centerX}px`;
  ripple.style.top = `${centerY}px`;
  ripple.style.opacity = "1";

  ripple.style.animation = "none";
  wave.style.animation = "none";

  void ripple.offsetWidth;
  void wave.offsetWidth;

  ripple.style.animation = "ripple-animation 0.8s ease-out forwards";
  wave.style.display = "block";
  wave.style.animation = "wave 1.5s ease-out forwards";

  setTimeout(() => {
    ripple.style.opacity = "0";
    wave.style.display = "none";
  }, 1500);

  playIntroVideo();
}

function playIntroVideo() {
  const video = document.getElementById("intro-video");
  const container = document.getElementById("captcha-container");

  container.style.display = "none";
  video.style.display = "block";
  video.play();
}