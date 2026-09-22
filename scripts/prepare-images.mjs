import sharp from 'sharp'
for (const name of ['georgiy-laying-tile','tile-still-life','measure-still-life']) {
 await sharp(`public/images/${name}.png`).webp({quality:90}).toFile(`public/images/${name}.webp`)
}
