let gameMode = "easy";
let currentLevelIndex = 0;
let firstTile = null;
let secondTile = null;
let isLocked = false;

let unlockedLevels = JSON.parse(localStorage.getItem("unlockedLevels") || "{}");
let coins = Number(localStorage.getItem("coins") || 0);
let hints = Number(localStorage.getItem("hints") || 0);