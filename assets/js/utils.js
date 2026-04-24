function showPopup(message) {
  const popup = document.getElementById("universalPopup");
  const msg = document.getElementById("popup-message");
  const ok = document.getElementById("popup-ok");
  if (!popup || !msg || !ok) {
    console.warn("Popup HTML missing.");
    return;
  }
  msg.innerHTML = message;
  popup.classList.remove("hidden");
  ok.onclick = function() {
    waitForButtonActive(function() {
      popup.classList.add("hidden");
    }, 120);
  };
}
const _AUDIO = { ctx: null };
function playTapSound() {
  try {
    if (!_AUDIO.ctx) _AUDIO.ctx = new (window.AudioContext || window.webkitAudioContext)();
    const ctx = _AUDIO.ctx;
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.value = 300;
    gain.gain.value = 0.12;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.07);
  } catch (e) {
    console.warn('playTapSound failed', e);
  }
}
document.addEventListener("pointerdown", e => {
  const btn = e.target.closest('button, [role="button"], a[data-button], [data-button], .level-btn');
  if (!btn) return;
  if (btn.disabled) return;
  playTapSound();
});
let audioCtx;
let musicEnabled = true;
let isPlaying = false;

function startGeneratedMusic() {
  if (!musicEnabled || isPlaying) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = audioCtx.createOscillator();
  osc.type = "sine";
  const gainNode = audioCtx.createGain();
  gainNode.gain.value = 0.15;
  osc.connect(gainNode).connect(audioCtx.destination);
  let note = 220;
  osc.frequency.setValueAtTime(note, audioCtx.currentTime);
  setInterval(() => {
    if (!musicEnabled) return;
    note = [220, 247, 262, 294, 330][Math.floor(Math.random() * 5)];
    osc.frequency.setValueAtTime(note, audioCtx.currentTime);
  }, 600);
  osc.start();
  isPlaying = true;
}
function triggerWrongShake() {
    const grid = document.getElementById("grid");
    grid.classList.add("shake");
    setTimeout(() => {
        grid.classList.remove("shake");
    }, 400);
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 60, 40, 60]);
    }
}