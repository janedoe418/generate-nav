import { parseJson } from './lib/parseJson.js';
import { renderNav } from './lib/renderNav.js';

// ナビゲーション生成メイン関数
export function generateNav(args) {
  const options = parseArgs(args); // オプション解析
  const json = parseJson(options.input);
  renderNav(json, options);
}

// コマンドライン引数のパース（--input/--output）
function parseArgs(args) {
  const input = args[args.indexOf('--input') + 1];
  const output = args[args.indexOf('--output') + 1];

  if (!input || !output) {
    throw new Error('⚠️ --input および --output の指定が必要です。');
  }

  return { input, output };
}
