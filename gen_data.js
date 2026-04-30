const fs = require('fs');

function createGrid(w, h, fill) {
    const grid = [];
    for (let y = 0; y < h; y++) {
        const row = [];
        for (let x = 0; x < w; x++) {
            row.push(fill);
        }
        grid.push(row);
    }
    return grid;
}

function borderGrid(grid, w, h) {
    for (let y = 0; y < h; y++) {
        grid[y][0] = 'W';
        grid[y][w-1] = 'W';
    }
    for (let x = 0; x < w; x++) {
        grid[0][x] = 'W';
        grid[h-1][x] = 'W';
    }
}

function placeItem(grid, item, x, y) {
    grid[y][x] = item;
}

function gridToString(grid) {
    return grid.map(row => "    " + row.map(c => c.padEnd(3, ' ')).join('')).join('\n');
}

const w = 40;
const h = 25;

// Map 1
const map1 = createGrid(w, h, '.');
borderGrid(map1, w, h);
placeItem(map1, 'P', 2, 2);
placeItem(map1, 'K1', 5, 5);
placeItem(map1, 'D1', 5, 6);
placeItem(map1, 'K2', 15, 5);
placeItem(map1, 'D2', 15, 6);
placeItem(map1, 'K3', 25, 5);
placeItem(map1, 'D3', 25, 6);
placeItem(map1, 'K5', 35, 5);
placeItem(map1, 'M1', 35, 20);
// Add RPG Elements
placeItem(map1, 'V1', 10, 10); // Slime
placeItem(map1, 'V1', 12, 10);
placeItem(map1, 'T1', 10, 20); // Chest
placeItem(map1, 'N1', 3, 3); // NPC
placeItem(map1, 'I1', 3, 4); // Inn

// Map 2
const map2 = createGrid(w, h, '.');
borderGrid(map2, w, h);
placeItem(map2, 'M2', 2, 2); // Back to Map 1
placeItem(map2, 'K4', 5, 5);
placeItem(map2, 'D4', 5, 6);
placeItem(map2, 'K6', 15, 5);
placeItem(map2, 'D5', 15, 6);
placeItem(map2, 'D6', 25, 6);
placeItem(map2, 'M3', 35, 20); // To Map 3
placeItem(map2, 'V2', 20, 10); // Goblin
placeItem(map2, 'V2', 22, 15);
placeItem(map2, 'Z1', 10, 5); // Shop
placeItem(map2, 'T2', 30, 5);

// Map 3
const map3 = createGrid(w, h, '.');
borderGrid(map3, w, h);
placeItem(map3, 'M4', 2, 2); // Back to Map 2
placeItem(map3, 'K7', 5, 5);
placeItem(map3, 'D7', 5, 6);
placeItem(map3, 'K8', 10, 5);
placeItem(map3, 'D8', 10, 6);
placeItem(map3, 'K9', 15, 5);
placeItem(map3, 'D9', 15, 6);
placeItem(map3, 'K13', 20, 5);
placeItem(map3, 'D13', 20, 6);
placeItem(map3, 'K14', 25, 5);
placeItem(map3, 'D14', 25, 6);
placeItem(map3, 'K15', 30, 5);
placeItem(map3, 'D15', 30, 6);
placeItem(map3, 'K16', 35, 5);
placeItem(map3, 'D16', 35, 6);
placeItem(map3, 'M5', 35, 20); // To Map 4
placeItem(map3, 'V3', 20, 15); // Skeleton
placeItem(map3, 'V3', 25, 15);
placeItem(map3, 'T3', 5, 20);

// Map 4
const map4 = createGrid(w, h, '.');
borderGrid(map4, w, h);
placeItem(map4, 'M6', 2, 2); // Back to Map 3
placeItem(map4, 'K10', 5, 5);
placeItem(map4, 'D10', 5, 6);
placeItem(map4, 'K11', 10, 5);
placeItem(map4, 'D11', 10, 6);
placeItem(map4, 'K12', 15, 5);
placeItem(map4, 'D12', 15, 6);
placeItem(map4, 'K17', 20, 5);
placeItem(map4, 'D17', 20, 6);
placeItem(map4, 'K18', 25, 5);
placeItem(map4, 'D18', 25, 6);
placeItem(map4, 'K19', 30, 5);
placeItem(map4, 'D19', 30, 6);
placeItem(map4, 'K20', 35, 5);
placeItem(map4, 'D20', 35, 6);
placeItem(map4, 'B9', 20, 20); // BOSS
placeItem(map4, 'E', 20, 22); // END

const newDataJs = \`
const GAME_TITLE = "戦慄の迷宮 RPGエディション";
const CREATOR_NAME = "YU HASEGAWA";
const CREATOR_WEBSITE = "https://woody-510.github.io/homepage/";

const MAPS = {
  startMap: \\\`
\${gridToString(map1)}
  \\\`,
  secondMap: \\\`
\${gridToString(map2)}
  \\\`,
  thirdMap: \\\`
\${gridToString(map3)}
  \\\`,
  fourthMap: \\\`
\${gridToString(map4)}
  \\\`
};

const WARPS = {
  "M1": { targetMap: "secondMap", targetX: 2, targetY: 2 },
  "M2": { targetMap: "startMap", targetX: 35, targetY: 20 },
  "M3": { targetMap: "thirdMap", targetX: 2, targetY: 2 },
  "M4": { targetMap: "secondMap", targetX: 35, targetY: 20 },
  "M5": { targetMap: "fourthMap", targetX: 2, targetY: 2 },
  "M6": { targetMap: "thirdMap", targetX: 35, targetY: 20 }
};

const QUIZZES = {
  D1: { type: "choice", question: "最初の扉だ。「1」を選べ！", choices: ["1", "2", "3"], answer: "1" },
  D2: { type: "text", question: "「ひらけ」と入力して！", answer: "ひらけ" },
  D3: { type: "choice", question: "この鍵の色は？", choices: ["赤", "ピンク", "青"], answer: "ピンク" },
  D4: { type: "choice", question: "ここは第4の扉。「4」を選べ！", choices: ["2", "3", "4"], answer: "4" },
  D5: { type: "text", question: "「ごま」と入力して！", answer: "ごま" },
  D6: { type: "choice", question: "落とし穴の記号は？", choices: ["X", "O", "Y"], answer: "X" },
  D7: { type: "choice", question: "このゲームのタイトルは戦慄の何？", choices: ["迷宮", "館", "森"], answer: "迷宮" },
  D8: { type: "text", question: "「かぎ」と入力して！", answer: "かぎ" },
  D9: { type: "choice", question: "プレイヤーの色は？", choices: ["水色", "赤", "緑"], answer: "水色" },
  D10: { type: "choice", question: "大きなマップに来たな。ここは第何マップ？", choices: ["2", "3", "4"], answer: "4" },
  D11: { type: "text", question: "「ゴール」と入力して！", answer: "ゴール" },
  D12: { type: "choice", question: "最後の扉だ！開くための言葉は？", choices: ["オープン", "クローズ", "ロック"], answer: "オープン" },
  D13: { type: "text", question: "「3」と入力して！", answer: "3" },
  D14: { type: "choice", question: "これは第何マップ？", choices: ["2", "3", "4"], answer: "3" },
  D15: { type: "text", question: "「ひらけ」と入力して！", answer: "ひらけ" },
  D16: { type: "choice", question: "迷宮の扉、選ぶなら？", choices: ["右", "左", "真ん中"], answer: "真ん中" },
  D17: { type: "text", question: "「4」と入力して！", answer: "4" },
  D18: { type: "choice", question: "この迷路の広さは？", choices: ["狭い", "普通", "広い"], answer: "広い" },
  D19: { type: "text", question: "「かぎ」と入力して！", answer: "かぎ" },
  D20: { type: "choice", question: "いよいよ最後。覚悟はいいか？", choices: ["はい", "いいえ", "たぶん"], answer: "はい" }
};

const SIGNS = {
  S1: { text: "ここから先は長い道のりだ。鍵を探し出して進め！" }
};

// RPG DATA
const ENEMIES = {
  V1: { name: "スライム", hp: 20, atk: 5, def: 2, exp: 10, gold: 5, color: "#2ecc71" },
  V2: { name: "ゴブリン", hp: 40, atk: 12, def: 5, exp: 25, gold: 15, color: "#e74c3c" },
  V3: { name: "スケルトン", hp: 60, atk: 20, def: 10, exp: 50, gold: 30, color: "#ecf0f1" },
  B9: { name: "魔王", hp: 200, atk: 35, def: 15, exp: 500, gold: 500, color: "#8e44ad" }
};

const CHESTS = {
  T1: { type: "gold", val: 50, msg: "50ゴールドを手に入れた！" },
  T2: { type: "weapon", val: 10, msg: "鉄の剣を手に入れた！(ATK+10)" },
  T3: { type: "armor", val: 10, msg: "鉄の鎧を手に入れた！(DEF+10)" }
};

const NPCS = {
  N1: { text: "この世界はRPGに進化したのじゃ！モンスターを倒してレベルを上げるのじゃ。" }
};

const SETTINGS = {
  moveSpeed: 0.2,
  tileSize: 40,
  playerColor: "#00ffff",
  keyColor: "#ff00ff",
  wallColor: "#1a2542",
  floorColor: "#0a1128"
};

if (typeof module !== 'undefined') module.exports = { GAME_TITLE, MAPS, WARPS, QUIZZES, SIGNS, ENEMIES, CHESTS, NPCS, SETTINGS };
\`;

fs.writeFileSync('c:/Users/yu_hs/Desktop/ゲームやる/data.js', newDataJs);
