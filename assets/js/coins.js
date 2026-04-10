function getSavedCoins() {
  const saved = Number(localStorage.getItem("coins"));
  return isNaN(saved) ? 0 : saved;
}
function updateCoinDisplay() {
  coins = Number(localStorage.getItem("coins")) || 0;

  const gameEl = document.getElementById("coinCount");
  if (gameEl) gameEl.textContent = coins;

  const shopEl = document.getElementById("shopCoins");
  if (shopEl) shopEl.textContent = `⭐ Coins: ${coins}`;
}