const fs = require('fs');

function makeMap(width, height, fillChars) {
  let grid = Array.from({ length: height }, () => Array(width).fill('.'));
  // fill edges with W
  for (let i = 0; i < width; i++) { grid[0][i] = 'W'; grid[height - 1][i] = 'W'; }
  for (let i = 0; i < height; i++) { grid[i][0] = 'W'; grid[i][width - 1] = 'W'; }

  // apply fills
  for (let f of fillChars) {
    if (f.type === 'rect') {
      for (let y = f.y; y < f.y + f.h; y++) {
        for (let x = f.x; x < f.x + f.w; x++) {
          grid[y][x] = f.char;
        }
      }
    } else if (f.type === 'point') {
      grid[f.y][f.x] = f.char;
    }
  }

  // render to string
  return grid.map(row => '    ' + row.map(c => c.padEnd(2, ' ')).join('').trim()).join('\n');
}

// Stage 1
const startMapFills = [
  { type: 'point', x: 2, y: 2, char: 'P' },
  // walls to separate areas
  { type: 'rect', x: 7, y: 1, w: 1, h: 8, char: 'W' },
  { type: 'rect', x: 19, y: 3, w: 1, h: 10, char: 'W' },
  // keys & doors
  { type: 'point', x: 4, y: 4, char: 'K1' },
  { type: 'point', x: 7, y: 5, char: 'D1' }, // Door 1 passing through wall
  { type: 'point', x: 14, y: 2, char: 'K2' },
  { type: 'rect', x: 10, y: 5, w: 9, h: 1, char: 'W' },
  { type: 'point', x: 14, y: 5, char: 'D2' },
  { type: 'point', x: 14, y: 11, char: 'K3' },
  { type: 'point', x: 19, y: 6, char: 'D3' },
  { type: 'point', x: 4, y: 10, char: 'S1' },
  { type: 'point', x: 30, y: 10, char: 'M1' },
];

const startMapStr = makeMap(35, 15, startMapFills);

// Stage 2
const secondMapFills = [
  { type: 'point', x: 2, y: 10, char: 'M2' },
  // wall
  { type: 'rect', x: 12, y: 1, w: 1, h: 10, char: 'W' },
  { type: 'rect', x: 24, y: 4, w: 1, h: 10, char: 'W' },
  // elements
  { type: 'point', x: 5, y: 3, char: 'K4' },
  { type: 'point', x: 12, y: 5, char: 'D4' },
  { type: 'point', x: 18, y: 2, char: 'K5' },
  { type: 'rect', x: 13, y: 8, w: 11, h: 1, char: 'W' },
  { type: 'point', x: 18, y: 8, char: 'D5' },
  { type: 'point', x: 18, y: 12, char: 'K6' },
  { type: 'point', x: 24, y: 8, char: 'D6' },
  { type: 'point', x: 20, y: 5, char: 'X' },
  { type: 'point', x: 30, y: 4, char: 'M3' },
];
const secondMapStr = makeMap(35, 15, secondMapFills);

// Stage 3
const thirdMapFills = [
  { type: 'point', x: 2, y: 4, char: 'M4' },
  // wall
  { type: 'rect', x: 8, y: 5, w: 1, h: 10, char: 'W' },
  { type: 'rect', x: 18, y: 1, w: 1, h: 10, char: 'W' },
  // elements
  { type: 'point', x: 5, y: 12, char: 'K7' },
  { type: 'point', x: 8, y: 8, char: 'D7' },
  { type: 'point', x: 12, y: 4, char: 'K8' },
  { type: 'rect', x: 9, y: 3, w: 9, h: 1, char: 'W' },
  { type: 'point', x: 13, y: 3, char: 'D8' },
  { type: 'point', x: 14, y: 12, char: 'K9' },
  { type: 'point', x: 18, y: 5, char: 'D9' },
  { type: 'point', x: 24, y: 10, char: 'S2' },
  { type: 'point', x: 30, y: 12, char: 'M5' },
];
const thirdMapStr = makeMap(35, 15, thirdMapFills);

// Stage 4 (large)
const fourthMapFills = [
  { type: 'point', x: 2, y: 12, char: 'M6' },
  // walls for large maze
  { type: 'rect', x: 10, y: 1, w: 1, h: 15, char: 'W' },
  { type: 'rect', x: 20, y: 10, w: 1, h: 14, char: 'W' },
  { type: 'rect', x: 30, y: 1, w: 1, h: 15, char: 'W' },
  { type: 'rect', x: 11, y: 10, w: 9, h: 1, char: 'W' },
  { type: 'rect', x: 21, y: 10, w: 9, h: 1, char: 'W' },
  // elements
  { type: 'point', x: 5, y: 5, char: 'K10' },
  { type: 'point', x: 10, y: 8, char: 'D10' },
  { type: 'point', x: 15, y: 2, char: 'K11' },
  { type: 'point', x: 15, y: 10, char: 'D11' },
  { type: 'point', x: 25, y: 12, char: 'K12' },
  { type: 'point', x: 20, y: 16, char: 'D12' },
  { type: 'point', x: 15, y: 20, char: 'X' },
  { type: 'point', x: 25, y: 5, char: 'X' },
  { type: 'point', x: 35, y: 5, char: 'S3' },
  { type: 'point', x: 40, y: 20, char: 'E' },
];
const fourthMapStr = makeMap(45, 25, fourthMapFills);


const quizzes = {};
for (let i = 1; i <= 12; i++) {
  quizzes['D' + i] = {
    type: "choice",
    question: "ここは第" + i + "の扉。開くための合言葉は？",
    choices: ["ひらけごま", "オープン", "カギ"],
    answer: "オープン"
  };
}

const dataJs = `// ==========================================
// data.js - ゲームのデータ設定ファイル
// このファイルを編集して、独自のゲームを作ろう！
// ==========================================

/* --- [ここから編集：基本設定] --- */
// ゲームのタイトル
const GAME_TITLE = "戦慄の迷宮";
// 製作者の名前
const CREATOR_NAME = "YU HASEGAWA";
// 製作者のウェブサイト（ない場合は空文字 "" にしてください）
const CREATOR_WEBSITE = "https://woody-510.github.io/homepage/";
/* --- [ここまで編集：基本設定] --- */

/* --- [ここから編集：マップデータ] --- */
// マップの形を文字で描きます。
// 各文字は必ず「半角スペース」で区切ってください！
// W : 壁 (Wall)
// . : 床 (歩ける場所)
// P : プレイヤーのスタート位置（ゲーム全体で1箇所だけ！）
// K1, K2... : 鍵 (Key)
// D1, D2... : 扉 (Door)
// M1, M2... : ワープポイント（マップ間の移動）
// S1, S2... : 看板 (Sign) - 調べるとヒントが出ます
// X : 落とし穴 (Trap) - 踏むとそのマップの入り口に戻されます
// E : エンディング（クリア地点）
const MAPS = {
  startMap: \\\`
${startMapStr}
  \\\`,
  secondMap: \\\`
${secondMapStr}
  \\\`,
  thirdMap: \\\`
${thirdMapStr}
  \\\`,
  fourthMap: \\\`
${fourthMapStr}
  \\\`
};

/* --- [ここまで編集：マップデータ] --- */

/* --- [ここから編集：マップ移動設定] --- */
// マップ上の「M1」などに乗ったとき、どこへ移動するかを設定します。
// targetMap: 移動先のマップ名
// targetX, targetY: 移動先の座標（左から何番目か、上から何番目か。0から数えます！）
const WARPS = {
  "M1": { targetMap: "secondMap", targetX: 2, targetY: 10 },
  "M2": { targetMap: "startMap", targetX: 29, targetY: 10 },
  "M3": { targetMap: "thirdMap", targetX: 2, targetY: 4 },
  "M4": { targetMap: "secondMap", targetX: 29, targetY: 4 },
  "M5": { targetMap: "fourthMap", targetX: 2, targetY: 12 },
  "M6": { targetMap: "thirdMap", targetX: 29, targetY: 12 }
};

/* --- [ここまで編集：マップ移動設定] --- */

/* --- [ここから編集：クイズデータ] --- */
// 扉（D1, D2...）に触れたときに出題されるクイズです。
const QUIZZES = ${JSON.stringify(quizzes, null, 2).replace(/"([^"]+)":/g, '$1:')};

/* --- [ここまで編集：クイズデータ] --- */

/* --- [ここから編集：看板データ] --- */
// マップ上のS1, S2などの看板を調べたときに出るメッセージです。
const SIGNS = {
  S1: { text: "ここから先は長い道のりだ。鍵を探し出して進め！" },
  S2: { text: "落とし穴に気をつけろ！踏むとマップの入り口に戻されるぞ。" },
  S3: { text: "ゴールは近い！最後の扉を開けろ！" },
  S4: { text: "ここは安全地帯だ。ひとやすみしていこう。" }
};

/* --- [ここまで編集：看板データ] --- */

/* --- [ここから編集：ゲームの調整] --- */
// ここはゲームの見た目やスピードなどの微調整を行う部分です。
const SETTINGS = {
  // 1マスを移動するのにかかる時間（秒）。0.2なら0.2秒で移動します。
  moveSpeed: 0.2,
  // 1マスのサイズ（ピクセル）。
  tileSize: 48,
  // プレイヤーの色
  playerColor: "#00ffff", // シアン色（水色）に光ります
  // 鍵の色
  keyColor: "#ff00ff", // マゼンタ色（ピンク）に光ります
  // 壁の色
  wallColor: "#1a2542", // 少し明るめの紺色
  // 床の色
  floorColor: "#0a1128" // 深いディープブルー
};
/* --- [ここまで編集：ゲームの調整] --- */
`;

fs.writeFileSync('data.js', dataJs);
