#!/usr/bin/env node
import { generateNav } from '../index.js';

const args = process.argv.slice(2);
// 例: node ./bin/cli.js --input nav.json --output nav.php

try {
  generateNav(args);
} catch (err) {
  console.error('⚠️ エラーが発生しました。');
  console.error(err.message);
  process.exit(1);
}
