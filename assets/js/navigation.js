// ===== NAVIGATION SYSTEM =====

function goto(id) {

  // 🔥 SHOP SCREEN (TOP, direct call)
  if (id === "shop-screen") {
    renderShop();
  }

  // Hide all screens
  document.querySelectorAll(".screen")
    .forEach(screen => screen.classList.add("hidden"));

  // Show selected screen
  const target = document.getElementById(id);
  if (!target) return;

  target.classList.remove("hidden");

  // 🔥 LEVEL SCREEN
  if (id === "levels-screen") {
    refreshLevelChecks();
  }

  // 🔥 MENU SYSTEM
  const menuContainer = document.getElementById("menu-container");
  const menuPopup = document.getElementById("menu-popup");

  const hideOnScreens = [
    "themes-screen",
    "settings-screen",
    "achievements-screen",
    "profile-screen",
    "daily-screen",
    "rewards-screen",
    "shop-screen",
    "texture-screen"
  ];

  const shouldHide = hideOnScreens.includes(id);

  if (menuContainer) menuContainer.style.display = shouldHide ? "none" : "block";

  if (menuPopup) menuPopup.classList.add("hidden");
}
window.addEventListener('DOMContentLoaded', () => {

  const menuBtn = document.getElementById('menu-btn');
  const menuPopup = document.getElementById('menu-popup');
  const closeBtn = document.getElementById('menu-back-btn');

  if (!menuBtn || !menuPopup) return;

  const _triggerMenu = typeof window.triggerMenuAnimation === 'function'
    ? window.triggerMenuAnimation
    : (sel, open = true) => {
        const el = document.querySelector(sel);
        if (!el) return;
        if (open) el.classList.remove('hidden');
        else el.classList.add('hidden');
      };

  // 🔥 OPEN (no toggle)
  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    _triggerMenu('#menu-popup', true, 420);
  });

  // 🔥 CLOSE (only button)
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      _triggerMenu('#menu-popup', false, 320);
    });
  }

});