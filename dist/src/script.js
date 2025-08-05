const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function launchFirework(x, y) {
  const count = 100;
  for (let i = 0; i < count; i++) {
    particles.push({
      x: x,
      y: y,
      dx: (Math.random() - 0.5) * 5,
      dy: (Math.random() - 0.5) * 5,
      life: 60,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`
    });
  }
}

function updateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    p.life--;
    if (p.life <= 0) particles.splice(i, 1);
  });
  if (particles.length > 0) {
    requestAnimationFrame(updateParticles);
  }
}

function showMessage(msg) {
  const responseText = document.getElementById('response');
  responseText.style.opacity = 1;
  responseText.textContent = msg;
}

function hideMessage(delay = 2500) {
  const responseText = document.getElementById('response');
  setTimeout(() => {
    responseText.style.opacity = 0;
  }, delay);
}

document.getElementById('yes-button').addEventListener('click', () => {
  const x = window.innerWidth / 2;
  const y = window.innerHeight / 2;
  showMessage("Ci vediamo a cena 🍝");
  launchFirework(x, y);
  updateParticles();
  setTimeout(() => {
    document.getElementById('form-yes').submit();
    hideMessage();
  }, 3000);
});

document.getElementById('maybe-button').addEventListener('click', () => {
  const x = window.innerWidth / 2;
  const y = window.innerHeight / 2;
  showMessage("Lo prendo comunque come un sì.");
  launchFirework(x, y);
  updateParticles();
  setTimeout(() => {
    document.getElementById('form-maybe').submit();
    hideMessage();
  }, 3000);
});

document.getElementById('no-button').addEventListener('click', () => {
  const responseText = document.getElementById('response');
  responseText.style.opacity = 1;
  responseText.textContent = "No...";
  setTimeout(() => {
    responseText.textContent = "Va bene... ma solo perché sei tu 💔";
    setTimeout(() => {
      document.getElementById('form-no').submit();
      hideMessage();
    }, 3000);
  }, 2000);
});
