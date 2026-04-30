// ==========================================
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
  startMap: `
    W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W
    W  P  .  .  .  W  .  W  .  .  .  .  .  .  .  .  .  .  X  W  .  .  .  .  .  .  .  W  .  W  .  .  .  K5 W
    W  .  .  W  .  W  .  W  .  W  W  W  W  W  W  W  W  W  .  W  .  W  W  W  W  W  W  W  .  W  .  .  .  .  W
    W  W  W  W  .  W  .  W  .  W  .  .  .  .  .  .  .  .  .  W  .  W  .  .  .  .  .  .  .  W  .  W  .  .  W
    W  .  .  K1 .  W  .  W  .  W  .  .  W  W  W  W  W  .  .  W  .  W  .  W  W  W  W  W  .  W  .  W  .  .  W
    W  .  W  W  W  W  .  D1 .  .  .  .  W  .  .  K2 W  .  .  D3 .  W  .  W  .  .  .  .  .  W  .  W  .  .  W
    W  .  .  .  .  .  .  W  .  .  .  .  W  .  W  .  W  .  .  W  .  W  .  W  .  W  W  W  W  W  .  W  .  .  W
    W  W  W  W  W  W  W  W  W  W  W  W  W  .  W  .  W  .  .  W  .  W  .  W  .  W  .  .  .  .  .  W  .  .  W
    W  K3 .  .  .  .  .  .  .  .  W  .  .  .  W  .  W  .  .  W  .  W  .  W  .  W  .  W  .  W  W  W  W  X  W
    W  X  W  W  W  W  W  W  W  .  D2 S7 X  .  W  .  .  .  .  W  .  .  .  W  .  W  .  W  .  W  .  .  .  .  W
    W  .  .  .  .  .  .  .  .  .  W  .  .  .  W  .  .  .  S4 W  .  .  .  W  .  .  .  W  .  .  .  M1 .  .  W
    W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W
  `,
  secondMap: `
    W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W
    W  .  .  .  W  .  .  .  .  .  .  .  W  .  .  .  .  .  .  .  .  .  .  .  W  .  .  .  .  .  X  .  .  .  W
    W  .  W  W  W  .  W  W  W  .  .  .  W  .  W  .  W  .  W  .  W  W  W  .  W  .  W  X  W  .  W  .  W  .  W
    W  .  W  .  W  K4 W  .  W  .  W  W  W  .  W  .  W  .  W  .  .  .  W  .  W  .  .  S8 W  .  W  .  W  .  W
    W  .  W  .  W  X  W  .  W  .  W  .  D4 .  W  X  W  .  W  W  W  X  W  .  W  .  W  W  W  .  W  .  W  .  W
    W  .  W  .  .  .  W  .  W  .  W  .  W  .  W  .  .  .  .  .  .  .  W  K6 W  .  .  .  .  .  W  .  W  .  W
    W  .  W  .  W  W  W  .  W  .  W  .  W  .  W  .  W  W  W  W  W  W  W  W  W  .  W  W  W  W  W  .  W  .  W
    W  .  .  .  .  W  .  .  .  .  W  .  W  .  W  .  W  .  .  .  .  .  X  .  D6 .  .  .  .  .  .  .  W  .  W
    W  .  W  W  W  W  .  W  W  W  W  .  W  .  W  .  D5 .  W  W  W  W  W  .  W  .  W  W  W  W  W  W  W  .  W
    W  .  .  M2 .  .  .  .  .  .  .  .  W  S3 W  SA W  .  .  .  .  .  .  .  W  .  .  .  .  .  X  .  M3 .  W
    W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W
  `,
  thirdMap: `
    W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W
    W  KC W  DC .  .  .  .  .  .  .  .  .  .  .  .  .  .  X  .  .  .  .  .  .  W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W
    W  .  W  .  W  W  W  .  W  .  .  .  .  .  .  .  X  .  .  .  .  X  .  KD .  W  W  W  DD W  W  W  W  W  W  W  W  W  W  W  W  W  .  W  .  W  .  X  X  X  X  X  X  X  X  X  X  X  .  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  .  W
    W  .  W  .  W  X  W  .  W  W  W  .  W  W  W  W  W  W  W  W  W  W  W  W  W  W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W  .  W  .  W  .  X  .  .  .  .  .  .  .  .  .  X  .  W  S6 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W
    W  .  W  M4 W  .  W  W  W  .  W  .  .  .  .  D8 .  W  .  .  .  .  .  X  .  W  .  .  .  W  W  W  W  W  W  .  W  W  W  W  W  W  .  W  .  W  .  .  .  X  X  .  X  .  X  X  .  X  .  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W 
    W  .  W  .  .  .  .  .  W  .  W  .  W  .  .  W  .  W  .  .  .  .  .  W  .  W  W  W  W  W  .  .  .  .  .  .  .  .  .  .  .  W  .  W  .  W  X  X  X  X  .  .  .  X  .  .  X  X  .  W
    W  .  W  W  W  W  W  .  W  .  W  .  W  .  .  W  .  W  .  W  .  W  W  W  .  D9 .  .  .  .  .  W  W  W  W  W  W  W  W  W  .  W  .  W  .  W  .  X  .  .  .  X  X  .  X  .  X  X  .  W
    W  .  .  .  .  .  .  .  W  .  .  .  W  .  .  W  .  .  .  W  .  .  .  .  .  W  .  W  .  .  .  .  .  .  .  .  .  .  .  W  .  W  .  W  .  W  .  X  .  X  X  X  X  .  X  .  X  X  .  W
    W  W  W  W  W  W  W  W  W  W  W  .  W  .  W  W  W  W  W  W  W  W  W  W  W  W  .  W  W  W  W  W  W  W  W  .  W  .  .  W  .  W  .  W  .  W  .  .  .  .  .  .  X  .  X  .  X  X  .  W
    W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W  KF .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W  .  W  W  .  W  .  W  .  W  .  W  X  X  X  X  X  .  X  .  .  .  X  X  .  W
    W  .  W  .  W  .  W  .  W  .  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  X  W  W  W  W  .  .  W  .  W  .  W  .  W  .  W  S0 .  .  .  X  .  .  .  X  .  X  X  .  W
    W  .  W  .  W  .  W  .  W  .  W  .  W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W  .  KK W  .  W  .  W  .  W  .  W  X  .  X  .  .  X  .  X  X  X  X  X  .  W
    W  .  W  .  W  .  W  .  W  .  D7 .  W  .  W  .  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  .  W  .  .  W  .  W  W  W  .  W  .  W  .  .  .  X  .  X  .  .  .  X  X  X  .  W
    W  .  W  .  W  W  W  .  W  .  W  .  W  .  W  .  .  .  X  .  .  .  X  .  .  .  .  .  W  .  .  .  W  .  W  .  W  W  .  W  .  .  .  W  .  W  .  X  .  X  .  X  X  X  .  X  X  X  .  W
    W  K9 X  .  .  K7 W  S5 W  .  W  .  .  .  W  .  X  .  .  .  X  .  .  .  X  .  K8 .  .  .  W  .  .  .  W  .  .  .  .  W  KE .  .  W  .  W  .  X  .  X  .  .  .  .  .  X  X  .  .  W
    W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  DF W  .  W  W  W  W  W  W  W  W  W  W  DE W  W
    W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  DK .  .  .  .  .  .  .  .  SB W  .  .  .  W
    W  .  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  .  W  M5 .  .  W
    W  S9 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W  .  .  .  W
    W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W
  `,
  fourthMap: `
    W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W
    W  .  .  .  .  .  X  X  X  X  X  X  X  X  X  X  X  X  X  X  W  .  .  .  .  .  .  .  .  .  W  .  .  .  .  .  .  .  .  .  W  .  .  .  .  .  .  W  .  .  .  .  S1 W  .  .  .  DO .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W
    W  S2 W  W  W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W  .  W  W  W  W  W  W  .  .  W  .  .  .  .  .  .  .  W  W  W  .  W  X  W  .  .  W  .  W  W  W  W  W  .  W  .  W  W  W  W  W  X  X  X  W  W  W  W  W  .  W  W  W  W  W  .  W  .  W
    W  .  W  .  W  .  W  W  W  W  W  W  W  W  W  W  W  W  W  .  W  X  W  W  .  X  .  .  .  .  W  .  W  W  W  W  W  .  .  .  DH .  X  KH .  .  .  W  .  W  .  .  .  .  .  W  .  W  .  .  .  W  W  W  W  W  .  .  .  .  .  W  .  .  .  W  .  W  .  W
    W  .  W  .  W  .  W  .  .  .  .  .  .  .  .  .  .  .  .  .  W  .  .  .  .  .  .  X  W  .  .  .  .  .  .  .  .  .  W  .  W  .  W  X  W  .  .  W  .  W  X  W  .  W  W  W  .  W  .  W  W  W  .  .  .  .  .  W  W  W  W  W  .  W  .  W  .  W  .  W
    W  .  W  .  .  .  .  .  W  .  W  W  W  .  W  W  W  W  .  W  W  .  W  W  W  W  W  W  W  W  .  W  W  W  .  W  W  W  W  .  W  .  .  .  .  .  .  W  .  W  .  W  .  W  .  W  .  W  .  .  .  .  .  .  .  .  W  W  .  .  .  .  .  W  .  W  W  W  .  W
    W  .  W  .  W  W  W  .  W  .  .  .  .  .  .  .  .  .  .  K0 W  .  .  KM X  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W  .  .  .  .  .  .  W  .  W  .  W  .  W  .  W  .  W  W  W  W  .  W  W  .  W  W  .  .  .  .  .  .  X  .  .  .  W  .  W
    W  .  W  .  .  .  .  .  W  .  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  DN W  W  W  W  W  W  .  W  .  W  .  W  .  W  .  .  .  .  W  .  .  W  .  .  .  .  .  W  W  W  .  .  W  .  .  W  .  W
    W  .  .  .  .  .  X  .  W  .  .  .  .  .  .  .  .  .  .  .  .  .  DG .  .  .  .  X  .  .  .  .  .  X  .  .  X  W  .  .  W  .  W  .  .  .  .  W  .  W  .  W  .  W  .  W  W  W  W  .  W  W  .  .  .  W  .  W  W  .  .  .  W  W  W  .  .  W  .  W
    W  W  W  W  W  .  .  .  W  .  .  W  .  W  W  W  W  W  W  W  W  .  W  X  X  .  X  .  .  X  .  X  .  .  .  X  .  W  .  .  W  .  .  W  W  .  .  W  .  W  .  W  .  W  .  .  .  .  W  .  .  W  .  W  .  W  .  W  .  .  .  .  .  W  .  W  .  W  .  W
    W  KG .  M6 W  .  W  W  W  W  .  W  .  .  .  W  .  .  .  .  .  .  W  .  .  .  .  X  .  X  .  .  .  X  .  .  X  W  .  .  W  .  W  .  .  W  .  W  .  W  .  W  .  W  W  W  W  .  W  W  .  W  .  W  .  W  .  W  .  .  KO .  .  W  .  W  .  W  .  W
    W  .  W  .  .  .  .  .  .  .  .  W  .  .  .  W  .  .  .  .  .  .  W  X  .  X  X  .  .  X  .  X  X  .  .  .  X  W  .  .  W  .  .  .  W  .  .  W  .  W  .  W  .  .  .  .  W  .  .  W  KP W  .  W  .  W  .  W  .  .  .  .  .  W  .  W  .  W  .  W
    W  .  W  W  W  W  W  W  W  W  W  W  W  W  .  W  .  W  W  W  W  W  W  X  .  .  .  .  X  .  X  X  .  .  X  .  .  D0 .  .  W  W  .  W  .  W  .  W  .  W  .  W  W  W  W  .  W  W  .  W  W  W  .  W  .  W  W  W  W  .  .  .  W  W  .  W  .  W  .  W
    W  .  .  .  .  .  .  .  .  .  .  .  .  W  .  .  .  .  .  .  .  .  W  .  .  .  X  X  KA .  .  .  .  X  X  .  X  W  .  .  W  .  .  .  .  .  .  W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W  .  .  .  .  .  W  .  W  .  .  .  .  .  W  .  W
    W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  DA W  W  W  W  W  W  W  .  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  .  W  W  W  W  W  .  W  .  W  .  X  .  W  .  W  .  W
    W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W  KN .  .  .  W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W  .  .  .  .  .  .  W  .  W  .  W  .  .  .  W  .  W  .  W
    W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W  .  X  X  .  W  .  X  X  .  W  W  W  .  W  W  W  W  W  .  W  .  W  W  W  W  W  W  .  W  .  W  W  W  W  W  .  W  .  W
    W  KI .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W  W  W  W  W  W  W  W  W  W  W  W  W  .  .  W  .  X  X  .  W  .  .  .  .  .  .  .  .  W  .  .  .  W  .  DM .  .  .  .  .  .  .  .  W  .  .  .  .  .  .  .  W  .  W
    W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  .  W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W  .  X  X  .  W  .  W  W  W  W  W  W  .  W  .  W  .  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  DP W
    W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W  W  .  .  .  .  .  .  .  .  .  .  .  W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W  .  .  KB W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W
    W  W  W  W  W  W  W  W  W  W  W  W  W  W  DI W  W  W  W  W  W  W  W  W  W  W  .  W  W  .  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  DL W  W  W  W  W  DB W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W
    W  .  .  .  X  .  .  .  .  .  .  W  .  .  .  .  .  .  .  .  .  .  .  .  X  W  .  .  .  .  .  .  .  .  .  .  .  X  W  .  W  X  X  X  X  X  X  X  X  X  X  X  X  X  X  .  X  X  X  X  W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W
    W  .  .  .  .  .  X  .  .  X  .  W  X  W  W  W  .  W  W  W  W  W  W  W  W  W  .  W  W  W  W  W  W  W  W  W  W  W  W  .  DJ .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  KL X  W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  E  .  .  W
    W  .  KJ .  X  .  .  .  X  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W  X  X  X  X  X  X  X  X  X  X  X  X  X  X  X  X  X  X  X  W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W
    W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W
  `
};
/* --- [ここまで編集：マップデータ] --- */

/* --- [ここから編集：マップ移動設定] --- */
// マップ上の「M1」などに乗ったとき、どこへ移動するかを設定します。
const WARPS = {
  "M1": { targetMap: "secondMap", targetX: 3, targetY: 9 },
  "M2": { targetMap: "startMap", targetX: 31, targetY: 10 },
  "M3": { targetMap: "thirdMap", targetX: 3, targetY: 4 },
  "M4": { targetMap: "secondMap", targetX: 31, targetY: 9 },
  "M5": { targetMap: "fourthMap", targetX: 3, targetY: 10 },
  "M6": { targetMap: "thirdMap", targetX: 56, targetY: 17 }
};
/* --- [ここまで編集：マップ移動設定] --- */

/* --- [ここから編集：クイズデータ] --- */
// 扉（D1, D2...）に触れたときに出題されるクイズです。
const QUIZZES = {
  D1: { type: "choice", question: "さいころの目、6の反対は？", choices: ["1", "2", "3"], answer: "1" },
  D2: { type: "text", question: "次の漢字の読みをひらがなで答えて！「縫製」", answer: "ほうせい" },
  D3: { type: "choice", question: "二回続けてやってくると、心が弾んじゃう季節は？", choices: ["秋", "梅雨", "雨季"], answer: "雨季" },
  D4: { type: "choice", question: "「平等な」という意味を持つ”even” もう一つの意味は？", choices: ["偶数", "奇数", "素数"], answer: "偶数" },
  D5: { type: "text", question: "鎖国が終わった後の時代は何時代？（漢字二文字）", answer: "明治" },
  D6: { type: "choice", question: "地球から一番近い恒星の名前は？", choices: ["シリウス", "太陽", "北極星"], answer: "太陽" },
  D7: { type: "choice", question: "水が一番重たくなる温度は？", choices: ["0℃", "4℃", "100℃"], answer: "4℃" },
  D8: { type: "text", question: "ギターを弾くときに使う小さな板状の道具の名前は？", answer: "ピック" },
  D9: { type: "choice", question: "バスケットボールのフリースローは何点？", choices: ["1点", "2点", "3点"], answer: "1点" },
  D0: { type: "choice", question: "投手と捕手のペアのことをなんという？", choices: ["コンビ", "バッテリー", "デュオ"], answer: "バッテリー" },
  DA: { type: "text", question: "車を後退させるときに入れるギアの名前は？（カタカナ）", answer: "リバース" },
  DB: { type: "choice", question: "キングとルークを同時に動かすチェスの特殊な動きは？", choices: ["キャスリング", "プロモーション", "アンパッサン"], answer: "キャスリング" },
  DC: { type: "text", question: "マイクラでマグマに水をかけたときにできる石は？（漢字三文字）", answer: "黒曜石" },
  DD: { type: "choice", question: "カナダの首都は？", choices: ["トロント", "バンクーバー", "オタワ"], answer: "オタワ" },
  DE: { type: "text", question: "羅生門の作者は誰？（漢字）", answer: "芥川龍之介" },
  DF: { type: "choice", question: "ペンギンが住んでいるのは？", choices: ["北極", "南極", "両方"], answer: "南極" },
  DG: { type: "text", question: "景気後退なのに物価が上がり続けることをなんという？（カタカナ）", answer: "スタグフレーション" },
  DH: { type: "choice", question: "巨人の永久欠番「３」といえば？", choices: ["長嶋茂雄", "王貞治", "原辰徳"], answer: "長嶋茂雄" },
  DI: { type: "text", question: "はがねタイプに効果がバツグンなのは、ほのお、かくとう、あとひとつは？", answer: "じめん" },
  DJ: { type: "choice", question: "空条承太郎のスタンドの名前は？", choices: ["スタープラチナ", "ザ・ワールド", "クレイジーダイヤモンド"], answer: "スタープラチナ" },
  DK: { type: "text", question: "精米歩合23%と極限まで磨いた山口県の日本酒の名前は？（漢字二文字）", answer: "獺祭" },
  DL: { type: "text", question: "井伊直弼が暗殺された桜田門外の変が起こったのは西暦何年？（数字四桁）", answer: "1860" },
  DM: { type: "choice", question: "日本三大時計メーカーといえば、カシオ、セイコー、あと一つは？", choices: ["シチズン", "オメガ", "ロレックス"], answer: "シチズン" },
  DN: { type: "text", question: "持続時間が1～2時間と短く、香料の濃度が2～5%と低い香水の名前は？（カタカナ）", answer: "オーデコロン" },
  DO: { type: "text", question: "自然な文章理解、テキスト生成を行うAI技術である「大規模言語モデル」をアルファベット三文字でなんという？", answer: "LLM" },
  DP: { type: "choice", question: "磁場中を移動する荷電粒子が受ける力といえば？", choices: ["動体視力", "クーロン力", "ローレンツ力"], answer: "ローレンツ力" },
};
/* --- [ここまで編集：クイズデータ] --- */

/* --- [ここから編集：看板データ] --- */
// マップ上のS1, S2などの看板を調べたときに出るメッセージです。
const SIGNS = {
  S1: { text: "自然言語理解がNLPで大規模言語モデルがLLMだ！" },
  S2: { text: "香水の持続時間が長い順に並べると、パルファム、オードトワレ、オーデコロン" },
  S3: { text: "1582年にペリー来航！1860年に桜田門外の変が起きて、1868年に明治維新！" },
  S4: { text: "”こおり”は”じめん”に、”じめん”は”はがね”に、”はがね”は”フェアリー”に強い。" },
  S5: { text: "新潟の八海山、兵庫の菊正宗、山口の獺祭" },
  S6: { text: "ここには何もないよ！" },
  S7: { text: "落とし穴に落ちると、最初の位置に戻されちゃうよ！" },
  S8: { text: "看板にはヒントが書いてあるかも！" },
  S9: { text: "回っていくのめんどくさくない？" },
  S0: { text: "落ちる！危ない！" },
  SA: { text: "解答方法の指定に注意して！" },
  SB: { text: "スタグネーション（景気停滞）とインフレーション（物価上昇）が同時進行すると、スタグフレーション（不況下の物価高）" }
};
/* --- [ここまで編集：看板データ] --- */

/* --- [ここから編集：鍵の名前データ] --- */
// インベントリ（所持品）に表示される鍵の名前を変更できます。
// ここに書いていない鍵は、そのままの名前（K1, KAなど）で表示されます。
const KEY_NAMES = {
  K1: "錆びついた鉄鍵",
  K2: "煤けた銅の鍵",
  K3: "鈍く光る銀鍵",
  K4: "苔むした石の鍵",
  K5: "意匠の凝った金鍵",
  K6: "色褪せた真鍮の鍵",
  K7: "重厚な黒鉄の鍵",
  K8: "古びた木製の鍵",
  K9: "透き通るガラスの鍵",
  K0: "双子の抱き合う鍵",
  KA: "十字の刻印鍵",
  KB: "月光を纏った鍵",
  KC: "蛇の絡み合う鍵",
  KD: "星屑の粉を被った鍵",
  KE: "黄金の心臓の鍵",
  KF: "血の滲んだ刻印鍵",
  KG: "炎を宿す鍵",
  KH: "氷の結晶の鍵",
  KI: "雷の稲妻の鍵",
  KJ: "竜の鱗の鍵",
  KK: "緑の宝石が埋め込まれた鍵",
  KL: "夜空を映す鍵",
  KM: "鳥の羽が飾られた鍵",
  KN: "双頭の鷲が刻印された鍵",
  KO: "孔雀の羽が飾られた鍵",
  KP: "女王の肖像が刻まれた鍵",
  // ↑好きな鍵の名前を「鍵のID: "表示したい名前",」の形で自由に書き換えてください！
};
/* --- [ここまで編集：鍵の名前データ] --- */

/* --- [ここから編集：ゲームの調整] --- */
// ここはゲームの見た目やスピードなどの微調整を行う部分です。
const SETTINGS = {
  moveSpeed: 0.2,
  tileSize: 48,
  playerColor: "#00ffff", // シアン色（水色）に光ります
  keyColor: "#ff00ff", // マゼンタ色（ピンク）に光ります
  wallColor: "#1a2542", // 少し明るめの紺色
  floorColor: "#0a1128" // 深いディープブルー
};
/* --- [ここまで編集：ゲームの調整] --- */
