import PlayMedia from './PlayMedia';
import './PlayBento.css';

// Play on the home page: up to 8 pieces in a bento that always fills its rectangle, however many
// there are and whatever their shapes. The grid is 4 columns of cells half as tall as they are wide,
// built from blocks 4 columns across:
//   SWW / WWS  a square piece beside two wide ones stacked (3 pieces, 4 rows)
//   SS         two squares side by side (2 pieces, 4 rows)
//   WW         two wides side by side (2 pieces, 2 rows)
//   B          one piece across the full width (1 piece, 4 rows)
// A wide slot (2 x 2 cells) is 2:1, a square slot (2 x 4 cells) is 1:1, so each piece gets a frame
// close to its own shape. On phones the same blocks stack in 2 columns.
const MAX = 8;
const isWide = (item) => item.media.ratio >= 1.25;

function plan(items) {
  const wides = items.filter(isWide);
  const squares = items.filter((item) => !isWide(item));
  const blocks = [];
  let flip = false;
  const take = (list) => list.shift();
  while (wides.length || squares.length) {
    if (squares.length && wides.length >= 2) {
      blocks.push({ kind: flip ? 'WWS' : 'SWW', items: [take(squares), take(wides), take(wides)] });
      flip = !flip;
    } else if (wides.length >= 2) {
      blocks.push({ kind: 'WW', items: [take(wides), take(wides)] });
    } else if (squares.length + wides.length >= 2) {
      // Squares pair up; a lone wide left with a square shares the pair.
      const pair = [take(squares) ?? take(wides), take(squares) ?? take(wides)];
      blocks.push({ kind: 'SS', items: pair });
    } else {
      blocks.push({ kind: 'B', items: [take(squares) ?? take(wides)] });
    }
  }
  return blocks;
}

// Rows of grid-template-areas for one block, for the 4-column (wide) and 2-column (narrow) grids.
function areas(block, names) {
  const [a, b, c] = names;
  switch (block.kind) {
    case 'SWW':
      return {
        wide: [`${a} ${a} ${b} ${b}`, `${a} ${a} ${b} ${b}`, `${a} ${a} ${c} ${c}`, `${a} ${a} ${c} ${c}`],
        narrow: [
          `${a} ${a}`,
          `${a} ${a}`,
          `${a} ${a}`,
          `${a} ${a}`,
          `${b} ${b}`,
          `${b} ${b}`,
          `${c} ${c}`,
          `${c} ${c}`,
        ],
      };
    case 'WWS':
      return {
        wide: [`${b} ${b} ${a} ${a}`, `${b} ${b} ${a} ${a}`, `${c} ${c} ${a} ${a}`, `${c} ${c} ${a} ${a}`],
        narrow: [
          `${a} ${a}`,
          `${a} ${a}`,
          `${a} ${a}`,
          `${a} ${a}`,
          `${b} ${b}`,
          `${b} ${b}`,
          `${c} ${c}`,
          `${c} ${c}`,
        ],
      };
    case 'SS':
      return {
        wide: Array(4).fill(`${a} ${a} ${b} ${b}`),
        narrow: [...Array(4).fill(`${a} ${a}`), ...Array(4).fill(`${b} ${b}`)],
      };
    case 'WW':
      return {
        wide: Array(2).fill(`${a} ${a} ${b} ${b}`),
        narrow: [...Array(2).fill(`${a} ${a}`), ...Array(2).fill(`${b} ${b}`)],
      };
    default:
      return { wide: Array(4).fill(`${a} ${a} ${a} ${a}`), narrow: Array(4).fill(`${a} ${a}`) };
  }
}

const template = (rows) => rows.map((r) => `"${r}"`).join(' ');

export default function PlayBento({ items }) {
  const blocks = plan(items.slice(0, MAX));
  const wide = [];
  const narrow = [];
  const placed = [];
  blocks.forEach((block) => {
    // Each piece's grid area is named by its position: p0, p1, ...
    const names = block.items.map((item) => {
      const area = `p${placed.length}`;
      placed.push({ item, area });
      return area;
    });
    const rows = areas(block, names);
    wide.push(...rows.wide);
    narrow.push(...rows.narrow);
  });

  return (
    <div
      className="play-bento"
      data-gallery
      style={{
        '--areas-wide': template(wide),
        '--rows-wide': wide.length,
        '--areas-narrow': template(narrow),
        '--rows-narrow': narrow.length,
      }}
    >
      {placed.map(({ item, area }) => (
        <article className="play-bento__item" key={item.title} style={{ gridArea: area }}>
          <h3 className="visually-hidden">{item.title}</h3>
          <PlayMedia media={item.media} details={item} fill />
        </article>
      ))}
    </div>
  );
}
