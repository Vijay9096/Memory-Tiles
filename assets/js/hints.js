// ===== HINT SYSTEM =====
function getSavedHints() {
  const saved = Number(localStorage.getItem("hints"));
  return saved || 0;
}
function useHint() {

  hints = getSavedHints(); // 🔥 ensure latest value

  if (hints <= 0) return;
  if (isLocked) return;

  const tiles = Array.from(document.querySelectorAll(".tile"))
    .filter(tile =>
      !tile.classList.contains("matched") &&
      !tile.classList.contains("flipped") // 🔥 important fix
    );

  if (tiles.length < 2) return;

  // pick random tile
  const first = tiles[Math.floor(Math.random() * tiles.length)];

  // find its pair
  const pair = tiles.find(t =>
    t !== first &&
    t.dataset.emoji === first.dataset.emoji
  );

  if (!pair) return;

  isLocked = true;

  // show both
  first.classList.add("flipped");
  pair.classList.add("flipped");

  // deduct hint
  hints--;
  localStorage.setItem("hints", hints);

  updateHintDisplay();

  // hide again
  setTimeout(() => {

    first.classList.remove("flipped");
    pair.classList.remove("flipped");

    isLocked = false;

  }, 800);
}
function updateHintDisplay() {
  hints = Number(localStorage.getItem("hints")) || 0;

  const gameEl = document.getElementById("hintCount");
  if (gameEl) gameEl.textContent = hints;

  const shopEl = document.getElementById("shopHints");
  if (shopEl) shopEl.textContent = `💡 Hints: ${hints}`;
}