// lib/renderNav.js
import fs from 'fs';
import path from 'path';
import navConfig from './navConfig.js';

/**
 * HTMLエスケープ
 */
function escape(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * 1アイテムを再帰的にレンダリング
 */
function renderItem(item, root = '') {
  const href = item.external ? item.url : `${root}${item.url || ''}`;
  const targetAttr = item.external ? ' target="_blank" rel="noopener"' : '';
  const itemType = item.itemType || 'http://schema.org/WebPage';

  // Extra class対応（navConfig.js で設定）
  const itemClass = [
    navConfig.itemClass,
    item.itemExtraClass
  ].filter(Boolean).join(' ');

  const linkClass = [
    navConfig.linkClass,
    item.linkExtraClass
  ].filter(Boolean).join(' ');

  let html = `  <li class="${itemClass}" itemprop="hasPart" itemscope itemtype="${escape(itemType)}">`;
  html += `<a class="${linkClass}" itemprop="url" href="${escape(href)}" aria-label="${escape(item.ariaLabel || item.name)}"${targetAttr}>${escape(item.name)}</a>`;

  if (item.items && Array.isArray(item.items) && item.items.length) {
    html += `<ul class="${navConfig.childListClass}">`;
    html += item.items.map(child => renderItem(child, root)).join('\n');
    html += `</ul>`;
  }

  html += `</li>`;
  return html;
}

/**
 * 配列のトップレベルをまとめて出力
 */
export function renderNav(jsonData, options = {}) {
  const { output = './nav.html', format = 'html', root = '' } = options;

  // 出力内容（コメントを追加したい場合： navConfig.js で設定）
  const header = navConfig.warningHeader ? navConfig.warningHeader : '';

  // 最上位<ul>で囲む（複数ナビグループにも対応）
  const navList = Array.isArray(jsonData) ? jsonData : [jsonData];
  let listHtml = `<ul class="${navConfig.rootListClass}">\n` +
    navList.map(item => renderItem(item, root)).join('\n') +
    `\n</ul>`;

  let outputContent = `${header}${listHtml}`;

  // minify
  outputContent = outputContent.replace(/\n\s*/g, '');

  try {
    fs.writeFileSync(path.resolve(output), outputContent, 'utf-8');
    console.log(`✅ ナビゲーションファイルを出力しました： ${path.resolve(output)}`);
  } catch (err) {
    console.error('⚠️ ファイル書き出しに失敗しました：', err.message);
    process.exit(1);
  }
}
