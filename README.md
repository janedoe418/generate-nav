# generate-nav

ナビゲーションHTML/PHPパーツ自動生成ツール / Navigation HTML/PHP Snippet Generator  

## このツールについて / About This Tool

案件でよくある「大量のナビや条件付きリンクを都度手作業でコピペするのが大変」
という悩みを、**ナビ情報をJSONで一元管理→HTML/PHPに自動変換**するだけの超シンプルなツールです。

* **Gulp/Vite等のビルド環境不要**
* **Node.jsさえ動けばOK**
* **JSONを修正 → `node ./bin/cli.js` 実行のみ**
* **クラス名やファイル先頭のコメント文言は `navConfig.js` でカスタマイズ可**
* **出力はminify（1行）形式で、自動生成ファイルは直編集禁止**
  
This is a simple tool for generating navigation HTML/PHP parts from a single JSON file.
It helps solve the common hassle of manually copy-pasting a large number of multi-level nav items or conditional links for each project.

* **No Gulp/Vite build tools required**
* **Runs anywhere Node.js is available**
* **Just edit the JSON and run `node ./bin/cli.js`**
* **Class names and file comments are customizable in `navConfig.js`**
* **Output is minified (one-line), auto-generated, and should NOT be edited manually**

---

## 使い方 / Usage

```bash
node ./bin/cli.js --input ./nav.json --output ./nav.php
```

---

## JSONスキーマ例 / JSON Schema Example

```json
{
  "url": "/parent/",
  "name": "親ページ",
  "items": [
    {
      "url": "/parent/child1/",
      "name": "子ページ1",
      "itemExtraClass": "js-nav-item",
      "linkExtraClass": "js-nav-link"
    },
    {
      "url": "/parent/child2/",
      "name": "子ページ2"
    }
  ]
}
```

---

## 出力例（minifyされています） / Example Output (minified)

```php
<?php
// このファイルは自動生成です。直接編集しないでください。
?><ul class="c-nav-list"><li class="c-nav-list__item" itemprop="hasPart" itemscope itemtype="http://schema.org/WebPage"><a class="c-nav-list__link" itemprop="url" href="/parent/" aria-label="親ページ">親ページ</a><ul class="c-nav-list__child"><li class="c-nav-list__item js-nav-item" itemprop="hasPart" itemscope itemtype="http://schema.org/WebPage"><a class="c-nav-list__link js-nav-link" itemprop="url" href="/parent/child1/" aria-label="子ページ1">子ページ1</a></li><li class="c-nav-list__item" itemprop="hasPart" itemscope itemtype="http://schema.org/WebPage"><a class="c-nav-list__link" itemprop="url" href="/parent/child2/" aria-label="子ページ2">子ページ2</a></li></ul></li></ul>
```

---

## 補足 / Notes

* クラス名やコメントの内容などは、 `navConfig.js` で自由にカスタマイズできます。 

* **Class names and comments can be customized in `navConfig.js`**
* **⚠️ File-internal comments are in Japanese only (sorry for the inconvenience!)**

> **If you see a Japanese warning comment in the output file,
> it just means “This file is auto-generated. Don’t edit!”**  