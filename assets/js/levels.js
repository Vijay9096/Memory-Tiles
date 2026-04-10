// ===== LEVEL SYSTEM =====

function refreshLevelChecks() {

  const grid = document.getElementById("level-grid");
  const title = document.getElementById("level-title");

  if (!grid) return;

  grid.innerHTML = "";

  // Title
  const modeName =
    gameMode.charAt(0).toUpperCase() + gameMode.slice(1);

  if (title) {
    title.textContent = modeName + " Levels";
  }

  // 🔥 Your storage system
  const maxUnlocked = unlockedLevels[gameMode] || 1;

  for (let i = 0; i < 20; i++) {

    const levelNumber = i + 1;

    const btn = document.createElement("div");
    btn.className = "level-btn";
    btn.textContent = "Level " + levelNumber;

    if (levelNumber > maxUnlocked) {

      // 🔒 Locked
      btn.classList.add("locked");

    } else {

      // 🔓 Unlocked
      btn.onclick = function () {
        currentLevelIndex = i;
        startLevel();
      };

    }

    grid.appendChild(btn);
  }
}
function unlockNextLevel() {

  if (!unlockedLevels[gameMode]) {
    unlockedLevels[gameMode] = 1;
  }

  if (currentLevelIndex + 1 >= unlockedLevels[gameMode]) {
    unlockedLevels[gameMode] = currentLevelIndex + 2;
  }

  localStorage.setItem(
    "unlockedLevels",
    JSON.stringify(unlockedLevels)
  );
}