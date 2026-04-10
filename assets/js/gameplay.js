function startLevel() {

  goto("game");
  updateHintDisplay();

  const title = document.getElementById("game-title");
  if (title) {
    title.textContent = "Level " + (currentLevelIndex + 1);
  }

  generateBoard();
}
function generateBoard() {

  const grid = document.getElementById("grid");
  if (!grid) return;

  grid.innerHTML = "";

  firstTile = null;
  secondTile = null;
  isLocked = false;

  let pool;
  let cols, rows;

  // 🎯 FINAL GRID DECISION
  if (gameMode === "easy") {
    pool = easyEmojis;
    cols = 4;
    rows = 4;
  } else {
    cols = 6;
    rows = 6;

    if (gameMode === "normal") pool = normalEmojis;
    else pool = hardEmojis;
  }

  grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

  const totalPairs = (cols * rows) / 2;

  const selected = [...pool]
    .sort(() => Math.random() - 0.5)
    .slice(0, totalPairs);

  const tiles = [...selected, ...selected]
    .sort(() => Math.random() - 0.5);

  tiles.forEach((emoji) => {

    const tile = document.createElement("div");
    tile.className = "tile";
    tile.dataset.emoji = emoji;

    tile.innerHTML = `
      <div class="tile-inner">
        <div class="tile-front"></div>
        <div class="tile-back">${emoji}</div>
      </div>
    `;

    tile.onclick = function () {
      handleTileClick(tile);
    };

    grid.appendChild(tile);
  });
}
function handleTileClick(tile) {

  if (isLocked) return;
  if (tile.classList.contains("flipped")) return;

  tile.classList.add("flipped");

  if (!firstTile) {
    firstTile = tile;
    return;
  }

  secondTile = tile;
  isLocked = true;

  const emoji1 = firstTile.dataset.emoji;
  const emoji2 = secondTile.dataset.emoji;

  if (emoji1 === emoji2) {

    setTimeout(() => {

      firstTile.classList.add("matched");
      secondTile.classList.add("matched");

      resetTurn();
      checkWin();

    }, 300);

  } else {

    setTimeout(() => {

      firstTile.classList.remove("flipped");
      secondTile.classList.remove("flipped");

      resetTurn();

    }, 400);
  }
}
function resetTurn() {
  firstTile = null;
  secondTile = null;
  isLocked = false;
}
function checkWin() {

  const totalTiles = document.querySelectorAll(".tile").length;
  const matchedTiles = document.querySelectorAll(".tile.matched").length;

  // 🔥 Only detect win
  if (totalTiles === matchedTiles) {
    markLevelDone();
  }
}
function markLevelDone() {

  const popup = document.getElementById("levelPopup");
  if (!popup) return;

  popup.classList.remove("hidden");

  // 🔙 BACK BUTTON
  const backbtn = document.getElementById("backbtn");
  if (backbtn) {
    backbtn.onclick = function () {
      popup.classList.add("hidden");
      goto("levels-screen");
    };
  }

  // ▶ NEXT LEVEL
  const nextBtn = document.getElementById("nextLevelbutton");
  if (nextBtn) {
    nextBtn.onclick = function () {
      popup.classList.add("hidden");

      currentLevelIndex++; // 🔥 go next level
      startLevel();
    };
  }

  // 🔁 RESTART LEVEL
  const restartBtn = document.getElementById("restartLevelbutton");
  if (restartBtn) {
    restartBtn.onclick = function () {
      popup.classList.add("hidden");

      startLevel(); // 🔥 same level restart
    };
  }

  // 🔓 Unlock after setting buttons
  unlockNextLevel();
}