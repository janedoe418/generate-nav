// lib/parseJson.js
import fs from 'fs';
import path from 'path';

export function parseJson(inputPath) {
  try {
    const jsonString = fs.readFileSync(path.resolve(inputPath), 'utf-8');
    const jsonData = JSON.parse(jsonString);

    // 配列じゃなかったらラップ
    if (Array.isArray(jsonData)) {
      return jsonData;
    } else if (typeof jsonData === 'object' && jsonData !== null) {
      return [jsonData];
    } else {
      throw new Error('⚠️ JSONのルートは配列またはオブジェクトにしてください。');
    }
  } catch (err) {
    throw new Error(`⚠️ JSONのパースに失敗しました： ${inputPath}: ${err.message}`);
  }
}
