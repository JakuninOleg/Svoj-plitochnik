from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen

root = Path(__file__).resolve().parents[1]
font = TTFont(root / 'node_modules/@fontsource/oswald/files/oswald-cyrillic-700-normal.woff')
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
def word(text, x, baseline, height):
    scale = height / 714
    paths, offset = [], 0
    for char in text:
        glyph = glyphs[cmap[ord(char)]]
        pen = SVGPathPen(glyphs)
        glyph.draw(pen)
        paths.append(f'<path transform="translate({offset} 0)" d="{pen.getCommands()}"/>')
        offset += glyph.width + 8
    return f'<g transform="translate({x} {baseline}) scale({scale} {-scale})">{"".join(paths)}</g>', offset * scale

mark = '<path d="M4 25 35 5v17L19 33v27h16v14H4Z"/><path d="M41 5 74 25v19H59V33l-3-2v43H41Z"/><path fill="#bf4232" d="M61 49h13v25H61Z"/>'
a, aw = word('СВОЙ', 88, 34, 27)
b, bw = word('ПЛИТОЧНИК', 88, 73, 27)
svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -9 {88+bw+3} 89"><title>Свой плиточник</title><g fill="#123f37">{mark}{a}{b}</g></svg>'
(root/'public/logo-svoy-plitochnik.svg').write_text(svg, encoding='utf-8')
(root/'public/brand-mark.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><g fill="#123f37">{mark}</g></svg>', encoding='utf-8')
