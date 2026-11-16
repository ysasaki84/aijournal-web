/**
 * 「」（）などの記号に隣接する **太字** を補正する remark プラグイン。
 *
 * CommonMark の仕様では、`が直面する**「AI導入の罠」**と` のように
 * ** の内側が記号・外側が文字になっていると太字として解釈されず、
 * アスタリスクがそのまま表示されてしまう。解釈されずに残った **…** を
 * テキストから拾い直して太字にする。依存パッケージなし。
 */
const PATTERN = /\*\*([^*\n]+?)\*\*/g;

export default function remarkCjkStrong() {
  return (tree) => walk(tree);
}

function walk(node) {
  if (!Array.isArray(node.children)) return;
  const next = [];
  for (const child of node.children) {
    if (child.type === 'text' && child.value.includes('**')) {
      next.push(...split(child.value));
    } else {
      walk(child);
      next.push(child);
    }
  }
  node.children = next;
}

function split(value) {
  const out = [];
  let last = 0;
  for (const m of value.matchAll(PATTERN)) {
    if (m.index > last) out.push({ type: 'text', value: value.slice(last, m.index) });
    out.push({ type: 'strong', children: [{ type: 'text', value: m[1] }] });
    last = m.index + m[0].length;
  }
  if (last === 0) return [{ type: 'text', value }];
  if (last < value.length) out.push({ type: 'text', value: value.slice(last) });
  return out;
}
