// ==========================================
// engine.js - RPGパズルゲームの心臓部
// ==========================================

// --- 状態管理 ---
let gameState = 'start'; // 'start', 'playing', 'quiz', 'ending', 'dialogue'
let currentMapName = '';
let currentMapData = [];
let tilesDOM = {};
let playerX = 0;
let playerY = 0;
let mapStartX = 0;
let mapStartY = 0;

let inventory = [];
let openedDoors = [];
let deadEnemies = [];
let openedChests = [];
let isMoving = false;
let noclip = false;

// RPG ステータス
let pLevel = 1;
let pExp = 0;
let pNextExp = 20;
let pHP = 100;
let pMaxHP = 100;
let pATK = 5;
let pDEF = 2;
let pGold = 0;

let audioCtx = null;

// --- 初期化 ---
window.onload = () => {
  document.getElementById('title-display').innerText = GAME_TITLE;
  document.title = GAME_TITLE;

  const creatorStr = CREATOR_WEBSITE !== ""
    ? `<a href="${CREATOR_WEBSITE}" target="_blank" style="color:var(--player-color)">${CREATOR_NAME}</a>`
    : CREATOR_NAME;
  document.getElementById('creator-display').innerHTML = creatorStr;
  document.getElementById('staff-name-display').innerText = CREATOR_NAME;

  document.getElementById('btn-start').onclick = startGame;

  document.documentElement.style.setProperty('--tile-size', `${SETTINGS.tileSize}px`);
  document.documentElement.style.setProperty('--move-speed', `${SETTINGS.moveSpeed}s`);
  document.documentElement.style.setProperty('--player-color', SETTINGS.playerColor);
  document.documentElement.style.setProperty('--key-color', SETTINGS.keyColor);
  document.documentElement.style.setProperty('--wall-color', SETTINGS.wallColor);
  document.documentElement.style.setProperty('--bg-color', SETTINGS.floorColor);
};

function initAudio() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContext();
}

function playSound(type) {
  if (!audioCtx || audioCtx.state === 'suspended') return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain); gain.connect(audioCtx.destination);
  const t = audioCtx.currentTime;

  if (type === 'move') {
    osc.type = 'sine'; osc.frequency.setValueAtTime(300, t);
    osc.frequency.exponentialRampToValueAtTime(500, t + 0.05);
    gain.gain.setValueAtTime(0.05, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    osc.start(t); osc.stop(t + 0.1);
  } else if (type === 'wall' || type === 'hit') {
    osc.type = 'sawtooth'; osc.frequency.setValueAtTime(150, t);
    gain.gain.setValueAtTime(0.05, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    osc.start(t); osc.stop(t + 0.1);
  } else if (type === 'success' || type === 'level') {
    osc.type = 'square'; osc.frequency.setValueAtTime(400, t);
    osc.frequency.setValueAtTime(600, t + 0.1); osc.frequency.setValueAtTime(800, t + 0.2);
    gain.gain.setValueAtTime(0.05, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    osc.start(t); osc.stop(t + 0.4);
  } else if (type === 'trap') {
    osc.type = 'sine'; osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(50, t + 0.3);
    gain.gain.setValueAtTime(0.1, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    osc.start(t); osc.stop(t + 0.3);
  }
}

function updateStatusUI() {
    // ステータスUI削除により処理を空に
}

// --- ゲーム開始 ---
function startGame() {
  initAudio();
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('game-container').classList.remove('hidden');
  gameState = 'playing';
  updateStatusUI();

  const startData = findStart();
  if (startData) {
    playerX = startData.x; playerY = startData.y;
    mapStartX = startData.x; mapStartY = startData.y;
    loadMap(startData.map);
  }
}

function findStart() {
  for (const [mapName, mapStr] of Object.entries(MAPS)) {
    const lines = mapStr.trim().split('\n');
    let y = 0;
    for (const line of lines) {
      const row = line.trim().split(/\s+/);
      if (row.length > 0 && row[0] !== "") {
        for (let x = 0; x < row.length; x++) { if (row[x] === 'P') return { map: mapName, x, y }; }
        y++;
      }
    }
  }
  return null;
}

// --- マップの読み込み ---
function loadMap(mapName) {
  currentMapName = mapName;
  const mapStr = MAPS[mapName];
  currentMapData = [];
  const lines = mapStr.trim().split('\n');
  for (let y = 0; y < lines.length; y++) {
    const row = lines[y].trim().split(/\s+/);
    if (row.length > 0 && row[0] !== "") currentMapData.push(row);
  }
  renderMap();
}

function renderMap() {
  const container = document.getElementById('map-container');
  container.innerHTML = ''; tilesDOM = {};

  for (let y = 0; y < currentMapData.length; y++) {
    for (let x = 0; x < currentMapData[y].length; x++) {
      const tileId = currentMapData[y][x];
      
      const floor = document.createElement('div');
      floor.className = 'tile floor';
      floor.style.left = `${x * SETTINGS.tileSize}px`;
      floor.style.top = `${y * SETTINGS.tileSize}px`;
      container.appendChild(floor);

      let elem = null;
      let uid = `${currentMapName}_${tileId}_${x}_${y}`; // 一意のID

      if (tileId === 'W') { elem = document.createElement('div'); elem.className = 'tile wall'; }
      else if (tileId.startsWith('K') && !inventory.includes(tileId)) { elem = document.createElement('div'); elem.className = 'tile key'; elem.innerText = '🔑'; }
      else if (tileId.startsWith('D') && !openedDoors.includes(uid)) { elem = document.createElement('div'); elem.className = 'tile door'; elem.innerText = '🚪'; }
      else if (tileId.startsWith('M')) { elem = document.createElement('div'); elem.className = 'tile warp'; elem.innerText = '🌀'; }
      else if (tileId === 'E') { elem = document.createElement('div'); elem.className = 'tile end'; elem.innerText = '👑'; }
      else if (tileId.startsWith('S')) { elem = document.createElement('div'); elem.className = 'tile sign'; elem.innerText = '📝'; }
      else if (tileId === 'X') { elem = document.createElement('div'); elem.className = 'tile trap'; elem.innerText = '🕳️'; }
      
      // RPG要素
      else if ((tileId.startsWith('V') || tileId.startsWith('B')) && ENEMIES[tileId] && !deadEnemies.includes(uid)) {
          elem = document.createElement('div'); elem.className = 'tile enemy'; elem.innerText = tileId.startsWith('B') ? '👿' : '👾';
          elem.style.backgroundColor = ENEMIES[tileId].color;
      }
      else if (tileId.startsWith('T') && CHESTS[tileId] && !openedChests.includes(uid)) {
          elem = document.createElement('div'); elem.className = 'tile chest'; elem.innerText = '🧰';
      }
      else if (tileId.startsWith('N')) { elem = document.createElement('div'); elem.className = 'tile npc'; elem.innerText = '👴'; }
      else if (tileId.startsWith('Z')) { elem = document.createElement('div'); elem.className = 'tile npc'; elem.innerText = '💰'; }
      else if (tileId.startsWith('I')) { elem = document.createElement('div'); elem.className = 'tile npc'; elem.innerText = '🛏️'; }

      if (elem) {
        elem.style.left = `${x * SETTINGS.tileSize}px`;
        elem.style.top = `${y * SETTINGS.tileSize}px`;
        container.appendChild(elem);
        tilesDOM[`${x},${y}`] = elem;
      }
    }
  }

  const player = document.createElement('div');
  player.id = 'player'; player.className = 'tile player'; player.innerText = '👤';
  container.appendChild(player);
  updatePlayerVisual();
}

function getTileAt(x, y) {
  if (y < 0 || y >= currentMapData.length || x < 0 || x >= currentMapData[y].length) return 'W';
  let tile = currentMapData[y][x];
  let uid = `${currentMapName}_${tile}_${x}_${y}`;
  if (tile.startsWith('K') && inventory.includes(tile)) return '.';
  if (tile.startsWith('D') && openedDoors.includes(uid)) return '.';
  if ((tile.startsWith('V') || tile.startsWith('B')) && deadEnemies.includes(uid)) return '.';
  if (tile.startsWith('T') && openedChests.includes(uid)) return '.';
  if (tile === 'P') return '.';
  return tile;
}

// --- キーボード入力 ---
document.addEventListener('keydown', (e) => {
  if (gameState !== 'playing') return;

  if (e.key === 'F2') {
    noclip = !noclip; showNotification(noclip ? "壁抜けON" : "壁抜けOFF");
    document.getElementById('debug-coords').classList.toggle('hidden', !noclip);
    if(noclip) updateDebugCoords();
    return;
  }

  let dx = 0, dy = 0;
  if (e.key === 'ArrowUp' || e.key === 'w') dy = -1;
  else if (e.key === 'ArrowDown' || e.key === 's') dy = 1;
  else if (e.key === 'ArrowLeft' || e.key === 'a') dx = -1;
  else if (e.key === 'ArrowRight' || e.key === 'd') dx = 1;

  if (dx !== 0 || dy !== 0) tryMove(dx, dy);
});

// --- 移動と判定 ---
function tryMove(dx, dy) {
  if (isMoving) return;
  const targetX = playerX + dx;
  const targetY = playerY + dy;
  const targetTile = getTileAt(targetX, targetY);
  let uid = `${currentMapName}_${targetTile}_${targetX}_${targetY}`;

  if (!noclip && targetTile === 'W') { playSound('wall'); return; }

  // 敵 (戦闘)
  if (targetTile.startsWith('V') || targetTile.startsWith('B')) {
      handleCombat(targetTile, targetX, targetY, uid);
      return;
  }
  // NPC・店・宿
  if (targetTile.startsWith('N') || targetTile.startsWith('Z') || targetTile.startsWith('I')) {
      handleNPC(targetTile, dx, dy);
      return;
  }
  // 宝箱
  if (targetTile.startsWith('T')) {
      handleChest(targetTile, targetX, targetY, uid);
      return;
  }

  // 扉の判定
  if (targetTile.startsWith('D')) {
    const requiredKey = 'K' + targetTile.substring(1);
    if (!inventory.includes(requiredKey)) {
      playSound('wall');
      const keyName = (typeof KEY_NAMES !== 'undefined' && KEY_NAMES[requiredKey]) ? KEY_NAMES[requiredKey] : requiredKey;
      showNotification(`鍵（${keyName}）が必要です！`);
      return;
    } else {
      if (QUIZZES[targetTile]) {
        showQuiz(targetTile, (success) => {
          if (success) { openedDoors.push(uid); removeDOMTile(targetX, targetY); executeMove(dx, dy); }
        });
        return;
      } else {
        openedDoors.push(uid); removeDOMTile(targetX, targetY); executeMove(dx, dy); return;
      }
    }
  }

  if (targetTile.startsWith('M')) {
    const warp = WARPS[targetTile];
    if (warp) {
      if (confirm("移動しますか？")) {
        playerX = warp.targetX; playerY = warp.targetY;
        mapStartX = warp.targetX; mapStartY = warp.targetY;
        loadMap(warp.targetMap); return;
      } else { executeMove(dx, dy); return; }
    }
  }

  if (targetTile.startsWith('S')) {
    const sign = SIGNS[targetTile];
    if (sign) { executeMove(dx, dy); showDialogue(sign.text); }
    return;
  }

  if (targetTile === 'X') {
    playSound('trap'); showNotification("落とし穴！入り口に戻されます。");
    pHP -= 10; if(pHP<=0) gameOver();
    playerX = mapStartX; playerY = mapStartY;
    updateStatusUI(); updatePlayerVisual(); return;
  }

  if (targetTile === 'E') { executeMove(dx, dy); setTimeout(triggerEnding, 500); return; }

  executeMove(dx, dy);
}

function removeDOMTile(x, y) {
    if (tilesDOM[`${x},${y}`]) {
        tilesDOM[`${x},${y}`].style.opacity = '0';
        setTimeout(() => tilesDOM[`${x},${y}`].remove(), 300);
    }
}

function updateDebugCoords() {
  const ui = document.getElementById('debug-coords');
  if (ui) ui.innerText = `X: ${playerX}, Y: ${playerY}`;
}

function executeMove(dx, dy) {
  isMoving = true; playerX += dx; playerY += dy;
  if (noclip) updateDebugCoords();
  playSound('move'); updatePlayerVisual();

  setTimeout(() => {
    const currentTile = getTileAt(playerX, playerY);
    if (currentTile.startsWith('K') && !inventory.includes(currentTile)) {
      inventory.push(currentTile); playSound('success');
      updateInventoryUI(); removeDOMTile(playerX, playerY);
    }
    isMoving = false;
  }, SETTINGS.moveSpeed * 1000);
}

function updatePlayerVisual() {
  const player = document.getElementById('player');
  player.style.transform = `translate(${playerX * SETTINGS.tileSize}px, ${playerY * SETTINGS.tileSize}px)`;

  const mapContainer = document.getElementById('map-container');
  const offsetX = window.innerWidth / 2 - (playerX * SETTINGS.tileSize + SETTINGS.tileSize / 2);
  const offsetY = window.innerHeight / 2 - (playerY * SETTINGS.tileSize + SETTINGS.tileSize / 2);
  mapContainer.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
}

// --- RPG 戦闘システム ---
function handleCombat(targetTile, targetX, targetY, uid) {
    const e = ENEMIES[targetTile];
    if (!e) return;
    
    // ダメージ計算
    let dmgToEnemy = Math.max(1, pATK - e.def);
    let dmgToPlayer = Math.max(1, e.atk - pDEF);
    
    // ボス戦などで敵のHP状態を保持する場合は複雑になるので、簡易的に一発で勝敗を判定（今回はシンプルなターンなし計算）
    // バンプ戦闘: ぶつかるたびに1ターン経過
    playSound('hit');
    
    // 敵HPの永続化（簡易）
    if(!e.currentHp) e.currentHp = e.hp;
    e.currentHp -= dmgToEnemy;
    
    // 敵が生きている場合、反撃
    if (e.currentHp > 0) {
        pHP -= dmgToPlayer;
        showNotification(`${e.name}に${dmgToEnemy}ダメージ！ 反撃で${dmgToPlayer}ダメージ！`);
        document.getElementById('flash-overlay').classList.remove('flash-red');
        void document.getElementById('flash-overlay').offsetWidth;
        document.getElementById('flash-overlay').classList.add('flash-red');
        
        // 敵ノックバック演出
        if(tilesDOM[`${targetX},${targetY}`]) {
            tilesDOM[`${targetX},${targetY}`].style.transform = 'translateY(-10px)';
            setTimeout(()=>tilesDOM[`${targetX},${targetY}`].style.transform = 'translateY(0)', 100);
        }
        
        if (pHP <= 0) gameOver();
    } else {
        // 敵撃破
        playSound('success');
        showNotification(`${e.name}を倒した！ ${e.exp} EXP, ${e.gold} G 獲得！`);
        deadEnemies.push(uid);
        pExp += e.exp; pGold += e.gold;
        removeDOMTile(targetX, targetY);
        e.currentHp = e.hp; // Reset for other instances of this enemy
        checkLevelUp();
    }
    updateStatusUI();
}

function checkLevelUp() {
    if (pExp >= pNextExp) {
        pLevel++;
        pExp -= pNextExp;
        pNextExp = Math.floor(pNextExp * 1.5);
        pMaxHP += 20; pHP = pMaxHP;
        pATK += 3; pDEF += 2;
        playSound('level');
        showDialogue(`レベルアップ！ レベル${pLevel}になった！`);
        updateStatusUI();
    }
}

function handleChest(targetTile, targetX, targetY, uid) {
    const chest = CHESTS[targetTile];
    if (!chest) return;
    playSound('success');
    showNotification(chest.msg);
    if(chest.type === 'gold') pGold += chest.val;
    if(chest.type === 'weapon') pATK += chest.val;
    if(chest.type === 'armor') pDEF += chest.val;
    openedChests.push(uid);
    removeDOMTile(targetX, targetY);
    updateStatusUI();
}

function handleNPC(targetTile, dx, dy) {
    const text = NPCS[targetTile] ? NPCS[targetTile].text : "......";
    if (targetTile.startsWith('Z')) {
        // Shop
        if(confirm(text)) {
            if(pGold >= 10) { pGold-=10; pHP = Math.min(pMaxHP, pHP+30); playSound('success'); showNotification('HPが30回復した！'); }
            else { showNotification('お金が足りない！'); playSound('wall'); }
        }
    } else if (targetTile.startsWith('I')) {
        // Inn
        if(confirm(text)) {
            if(pGold >= 5) { pGold-=5; pHP = pMaxHP; playSound('success'); showNotification('HPが全回復した！'); }
            else { showNotification('お金が足りない！'); playSound('wall'); }
        }
    } else {
        // Normal NPC
        showDialogue(text);
    }
    updateStatusUI();
}

function gameOver() {
    pHP = 0; updateStatusUI();
    gameState = 'ending';
    showDialogue("ゲームオーバー...勇者は倒れてしまった。");
    setTimeout(() => location.reload(), 3000);
}

// --- UI / クイズ / ダイアログ ---
function showDialogue(text) {
  gameState = 'dialogue';
  const overlay = document.getElementById('quiz-overlay');
  overlay.innerHTML = ''; overlay.classList.remove('hidden');

  const container = document.createElement('div');
  container.className = 'quiz-container';

  const pText = document.createElement('p');
  pText.innerText = text; pText.style.fontSize = '24px'; pText.style.margin = '20px 0';
  container.appendChild(pText);

  const closeBtn = document.createElement('button');
  closeBtn.innerText = '閉じる';
  closeBtn.onclick = () => { overlay.classList.add('hidden'); gameState = 'playing'; };
  container.appendChild(closeBtn);

  const keyHandler = (e) => {
    if (e.key === 'Enter' || e.key === ' ') { document.removeEventListener('keydown', keyHandler); closeBtn.click(); }
  };
  document.addEventListener('keydown', keyHandler);
  container._keyHandler = keyHandler;
  overlay.appendChild(container);
}

function showQuiz(doorId, onComplete) {
  gameState = 'quiz';
  const quiz = QUIZZES[doorId];
  if(!quiz) { onComplete(true); return; }

  const overlay = document.getElementById('quiz-overlay');
  overlay.innerHTML = ''; overlay.classList.remove('hidden');

  const container = document.createElement('div');
  container.className = 'quiz-container';

  const qText = document.createElement('h2');
  qText.innerText = quiz.question;
  container.appendChild(qText);

  if (quiz.type === 'choice') {
    const choicesDiv = document.createElement('div'); choicesDiv.className = 'choices-container';
    quiz.choices.forEach((c, index) => {
      const btn = document.createElement('button');
      btn.innerText = `${index + 1}. ${c}`;
      btn.onclick = () => handleQuizAnswer(c, quiz.answer, onComplete, container);
      choicesDiv.appendChild(btn);
    });
    container.appendChild(choicesDiv);

    const keyHandler = (e) => {
      const num = parseInt(e.key);
      if (!isNaN(num) && num >= 1 && num <= quiz.choices.length) { handleQuizAnswer(quiz.choices[num - 1], quiz.answer, onComplete, container); }
    };
    document.addEventListener('keydown', keyHandler);
    container._keyHandler = keyHandler;
  } else {
    const input = document.createElement('input');
    input.type = 'text'; input.id = 'quiz-input'; input.autocomplete = 'off';
    container.appendChild(input);

    const submitBtn = document.createElement('button'); submitBtn.innerText = '回答する';
    submitBtn.onclick = () => handleQuizAnswer(input.value, quiz.answer, onComplete, container);
    container.appendChild(submitBtn);

    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleQuizAnswer(input.value, quiz.answer, onComplete, container); });
    setTimeout(() => input.focus(), 100);
  }
  overlay.appendChild(container);
}

function handleQuizAnswer(given, correct, onComplete, container) {
  if (container._keyHandler) document.removeEventListener('keydown', container._keyHandler);
  if (given.trim().toLowerCase() === correct.toLowerCase()) {
    playSound('success');
    const flash = document.getElementById('flash-overlay');
    flash.classList.remove('flash-anim'); void flash.offsetWidth; flash.classList.add('flash-anim');
    document.getElementById('quiz-overlay').classList.add('hidden');
    gameState = 'playing'; onComplete(true);
  } else {
    playSound('wall'); document.getElementById('quiz-overlay').classList.add('hidden');
    showNotification("不正解..."); gameState = 'playing'; onComplete(false);
  }
}

function updateInventoryUI() {
  const list = document.getElementById('inventory-list');
  list.innerHTML = '';
  inventory.forEach(key => {
    const li = document.createElement('li');
    const keyName = (typeof KEY_NAMES !== 'undefined' && KEY_NAMES[key]) ? KEY_NAMES[key] : key;
    li.innerText = `🔑 ${keyName}`;
    list.appendChild(li);
  });
}

function showNotification(text) {
  const notif = document.getElementById('notification');
  notif.innerText = text; notif.style.opacity = '1';
  setTimeout(() => { notif.style.opacity = '0'; }, 2000);
}

function triggerEnding() {
  gameState = 'ending';
  document.getElementById('ui-container').classList.add('hidden');
  playSound('success'); setTimeout(() => playSound('success'), 200); setTimeout(() => playSound('success'), 400);

  const endingScreen = document.getElementById('ending-screen');
  endingScreen.classList.remove('hidden');

  const scrollContent = document.getElementById('ending-scroll');
  scrollContent.style.animation = 'scrollUp 20s linear forwards';
}
