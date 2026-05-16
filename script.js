const heartsLayer = document.querySelector(".floating-hearts");
const starsLayer = document.querySelector(".stars");
const revealItems = document.querySelectorAll(".reveal");
const photoImages = document.querySelectorAll(".photo-frame img, .gallery-card img");
const musicButton = document.querySelector(".music-toggle");
const audio = document.querySelector("#love-song");
const finale = document.querySelector("#finale");
const specialButton = document.querySelector(".special-button");
const canvas = document.querySelector("#confetti-canvas");
const ctx = canvas.getContext("2d");

let confettiPieces = [];
let confettiRunning = false;

function createHearts() {
  for (let index = 0; index < 28; index += 1) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = "♥";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${14 + Math.random() * 26}px`;
    heart.style.setProperty("--duration", `${10 + Math.random() * 14}s`);
    heart.style.setProperty("--drift", `${-80 + Math.random() * 160}px`);
    heart.style.animationDelay = `${Math.random() * -22}s`;
    heartsLayer.appendChild(heart);
  }
}

function createStars() {
  for (let index = 0; index < 70; index += 1) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty("--duration", `${1.8 + Math.random() * 3.6}s`);
    star.style.animationDelay = `${Math.random() * -4}s`;
    starsLayer.appendChild(star);
  }
}

function observeReveals() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 5, 4) * 70}ms`;
    observer.observe(item);
  });
}

function setupImageFallbacks() {
  photoImages.forEach((image) => {
    image.addEventListener("error", () => {
      image.classList.add("is-missing");
    });
  });
}

function setupParallax() {
  const frames = document.querySelectorAll(".parallax-photo");

  window.addEventListener(
    "scroll",
    () => {
      frames.forEach((frame) => {
        const rect = frame.getBoundingClientRect();
        const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
        const move = Math.max(Math.min(centerOffset * -0.035, 18), -18);
        frame.style.transform = `translateY(${move}px)`;
      });
    },
    { passive: true }
  );
}

function setupMusic() {
  musicButton.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
        musicButton.classList.add("is-playing");
        musicButton.setAttribute("aria-pressed", "true");
        musicButton.querySelector("span:last-child").textContent = "Gra";
      } catch {
        musicButton.querySelector("span:last-child").textContent = "Dodaj plik";
      }
      return;
    }

    audio.pause();
    musicButton.classList.remove("is-playing");
    musicButton.setAttribute("aria-pressed", "false");
    musicButton.querySelector("span:last-child").textContent = "Muzyka";
  });
}

function resizeCanvas() {
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
}

function makeConfettiPiece() {
  const isHeart = Math.random() > 0.34;
  return {
    x: Math.random() * window.innerWidth,
    y: -20 - Math.random() * 220,
    size: 8 + Math.random() * 14,
    speed: 1.8 + Math.random() * 4.2,
    swing: Math.random() * 2.8,
    rotation: Math.random() * Math.PI,
    rotationSpeed: -0.08 + Math.random() * 0.16,
    color: ["#ff5d9e", "#f4c76b", "#7f5cff", "#ffffff", "#ff9fc5"][Math.floor(Math.random() * 5)],
    isHeart,
  };
}

function drawHeart(x, y, size, color, rotation) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.scale(size / 22, size / 22);
  ctx.beginPath();
  ctx.moveTo(0, 7);
  ctx.bezierCurveTo(-12, -3, -8, -14, 0, -8);
  ctx.bezierCurveTo(8, -14, 12, -3, 0, 7);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function startConfetti() {
  confettiPieces = Array.from({ length: 170 }, makeConfettiPiece);

  if (confettiRunning) {
    return;
  }

  confettiRunning = true;
  requestAnimationFrame(runConfetti);
}

function runConfetti() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  confettiPieces.forEach((piece) => {
    piece.y += piece.speed;
    piece.x += Math.sin(piece.y * 0.02) * piece.swing;
    piece.rotation += piece.rotationSpeed;

    if (piece.isHeart) {
      drawHeart(piece.x, piece.y, piece.size, piece.color, piece.rotation);
    } else {
      ctx.save();
      ctx.translate(piece.x, piece.y);
      ctx.rotate(piece.rotation);
      ctx.fillStyle = piece.color;
      ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.65);
      ctx.restore();
    }
  });

  confettiPieces = confettiPieces.filter((piece) => piece.y < window.innerHeight + 40);

  if (confettiPieces.length > 0) {
    requestAnimationFrame(runConfetti);
    return;
  }

  confettiRunning = false;
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
}

function triggerFinaleOnce() {
  let alreadyTriggered = false;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !alreadyTriggered) {
          alreadyTriggered = true;
          setTimeout(startConfetti, 850);
        }
      });
    },
    { threshold: 0.45 }
  );

  observer.observe(finale);
}

createHearts();
createStars();
observeReveals();
setupImageFallbacks();
setupParallax();
setupMusic();
resizeCanvas();
triggerFinaleOnce();

specialButton.addEventListener("click", startConfetti);
window.addEventListener("resize", resizeCanvas);
