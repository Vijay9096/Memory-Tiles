function goto(id) {

  // Hide all screens
  document.querySelectorAll('.screen')
    .forEach(s => s.classList.add('hidden'));

  // Show selected screen
  const target = document.getElementById(id);
  if (target) target.classList.remove('hidden');

  // If going to shop
  if (id === "shop-screen") {
    coins = Number(localStorage.getItem("coins") || 0);
    hints = Number(localStorage.getItem("hints") || 0);
    if (typeof renderShop === "function") renderShop();
  }

  // If going to levels screen
  if (id === "levels-screen") {
    if (typeof refreshLevelChecks === "function") refreshLevelChecks();
    setTimeout(() => {
      const el = document.getElementById('levels-screen');
      if (el) el.scrollTop = 0;
    }, 10);
  }

  // If going to game screen
  if (id === "game") {
    if (typeof updateCoinDisplay === "function") updateCoinDisplay();
    if (typeof updateHintDisplay === "function") updateHintDisplay();
  }

  // Achievements
  if (id === "achievements-screen" && typeof renderAchievements === "function") {
    renderAchievements();
  }

  // Profile
  if (id === "profile-screen" && typeof updateProfileScreen === "function") {
    updateProfileScreen();
  }

  // Daily
  if ((id === "daily-screen" || id === "daily-reward-screen") &&
      typeof refreshDailyUI === "function") {
    refreshDailyUI();
  }

  // Clear level button visibility
  const clearBtn = document.getElementById('clearLevelBtn');
  if (clearBtn) {
    clearBtn.style.display = (id === 'game') ? 'block' : 'none';
  }

  // Menu handling
  const menuContainer = document.getElementById('menu-container');
  const menuPopup = document.getElementById('menu-popup');

  const hideOnScreens = [
    'themes-screen',
    'settings-screen',
    'achievements-screen',
    'profile-screen',
    'daily-screen',
    'daily-reward-screen',
    'shop-screen'
  ];

  const shouldHide = hideOnScreens.includes(id);

  if (menuContainer) {
    menuContainer.style.display = shouldHide ? 'none' : 'block';
  }

  if (menuPopup) {
    menuPopup.classList.add('hidden');
  }
}
document.addEventListener("DOMContentLoaded", function () {

  const menuBtn = document.getElementById("menu-btn");
  const menuPopup = document.getElementById("menu-popup");

  if (!menuBtn || !menuPopup) return;

  // Open menu
  menuBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    menuPopup.classList.toggle("hidden");
  });

  // Close menu when clicking outside
  document.addEventListener("click", function () {
    menuPopup.classList.add("hidden");
  });

  // Prevent closing when clicking inside popup
  menuPopup.addEventListener("click", function (e) {
    e.stopPropagation();
  });
const closeBtn = document.getElementById("closePopup");

if (closeBtn) {
  closeBtn.onclick = function () {
    document
      .getElementById("levelPopup")
      .classList.add("hidden");

    goto("levels-screen");
  };
};
});