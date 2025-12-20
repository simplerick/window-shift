const topWindow = document.querySelector(".app-window--top");
const topScreen = document.querySelector(".showcase-screen--top")
const botWindow = document.querySelector(".app-window--bottom");
const hintRowDown = document.querySelector('.hotkey-hint__row--down');
const hintRowUp   = document.querySelector('.hotkey-hint__row--up');


const opts = { 
  duration: 250, 
  easing: "ease-in-out", 
  fill: "both", 
  translate_percent: Math.round(topScreen.offsetHeight/topWindow.offsetHeight * 100)
};


const moveKeyframes = [
  { transform: "translateY(0%)" },
  { transform: `translateY(${opts.translate_percent}%)` }
];


const topFadeKeys = [
  { opacity: 1, offset: 0 },
  { opacity: 1, offset: 0.35 },
  { opacity: 0, offset: 1 }
];

const botFadeKeys = [
  { opacity: 0, offset: 0 },
  { opacity: 1, offset: 0.75 },
  { opacity: 1, offset: 1 }
];

const anims = [
  topWindow.animate(moveKeyframes, opts),
  topWindow.animate(topFadeKeys, opts),
  botWindow.animate(moveKeyframes, opts),
  botWindow.animate(botFadeKeys, opts)
];


let hintTimeout;
function flashHint(direction) {
  const row = direction === 'forward' ? hintRowDown : hintRowUp;
  hintRowDown.classList.remove('is-active');
  hintRowUp.classList.remove('is-active');
  
  row.classList.add('is-active');
  clearTimeout(hintTimeout);
  hintTimeout = setTimeout(() => {
    row.classList.remove('is-active');
  }, 350);
}


function play(direction) {
  flashHint(direction);
  const duration = anims[0].effect.getTiming().duration;
  const t = anims[0].currentTime ?? 0;
  const progress = t / duration;

  // already at the end -> ignore extra "forward"
  if (direction === "forward" && progress >= 0.999) return;
  // already at the start -> ignore extra "backward"
  if (direction === "backward" && progress <= 0.001) return;

  const rate = direction === "forward" ? 1 : -1;
  anims.forEach(a => {
    a.playbackRate = rate;
    a.play();          // continues or reverses smoothly
  });
}


let autoDir = 'backward';
let autoTimer = setInterval(() => {
  play(autoDir);
  autoDir = autoDir === 'forward' ? 'backward' : 'forward';
}, 4000);

function stopAutoplay() {
  clearInterval(autoTimer);
}


document.addEventListener('keydown', (e) => {
  if (!(e.ctrlKey && e.metaKey)) return;

  stopAutoplay();

  if (e.key === 'ArrowUp') {
    e.preventDefault();
    play('backward');
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    play('forward');
  }
});
