import { chromium } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'
import assert from 'node:assert/strict'
await mkdir('screenshots/fidelity', { recursive: true })
const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
})
const results = []
for (const width of [2560, 1920, 1366, 1024, 768, 440, 390, 360]) {
  const page = await browser.newPage({
    viewport: { width, height: width > 1000 ? 1080 : 900 },
    deviceScaleFactor: 1,
  })
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.evaluate(async () => {
    await Promise.all(
      Array.from(document.images).map(async (image) => {
        image.loading = 'eager'
        try {
          await image.decode()
        } catch {}
      }),
    )
  })
  await page.addStyleTag({ content: 'nextjs-portal{display:none!important}' })
  await page.screenshot({ path: `screenshots/fidelity/page-${width}.png`, fullPage: true })
  await page.locator('.hero-wrap').screenshot({ path: `screenshots/fidelity/hero-${width}.png` })
  await page
    .locator('.master-wrap')
    .screenshot({ path: `screenshots/fidelity/master-${width}.png` })
  const layout = await page.evaluate(() => ({
    width: innerWidth,
    scroll: document.documentElement.scrollWidth,
    broken: Array.from(document.images)
      .filter((i) => !i.complete || !i.naturalWidth)
      .map((i) => i.src),
  }))
  results.push({ ...layout, errors })
  await page.close()
}
await writeFile('screenshots/fidelity/checks.json', JSON.stringify(results, null, 2))
assert(
  results.every((r) => r.scroll === r.width && r.broken.length === 0 && r.errors.length === 0),
  'Responsive page errors',
)
const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
await page.locator('.mobile-menu-trigger').click()
await page.waitForTimeout(650)
await page.screenshot({ path: 'screenshots/fidelity/menu-390.png', fullPage: false })
await page.locator('.mobile-menu a[href="#projects"]').click()
assert.equal(await page.locator('.mobile-menu-trigger').getAttribute('aria-expanded'), 'false')
await page.locator('.project-grid button').first().click()
assert(await page.locator('dialog[open]').isVisible())
await page.keyboard.press('Escape')
assert.equal(await page.locator('dialog[open]').count(), 0)
await page.locator('.video-grid button').first().click()
await page.locator('dialog[open] video').waitFor()
await page.locator('dialog[open] .dialog-close').click()
await page.locator('.quote-form .custom-select summary').click()
await page.getByRole('option', { name: 'Кухонный фартук' }).click()
const quotePhone = page.locator('.quote-form input[name="phone"]')
await quotePhone.fill('89991234567')
assert.equal(await quotePhone.inputValue(), '+7 (999) 123-45-67')
await quotePhone.press('Backspace')
assert.equal(await quotePhone.inputValue(), '+7 (999) 123-45-6')
await quotePhone.fill('89991234567')
await page
  .locator('.quote-form input[type="file"]')
  .setInputFiles('public/images/bathroom-marble.jpg')
assert(await page.getByText('Выбрано фото: 1').isVisible())
assert(await page.locator('.photo-previews img').isVisible())
await page.locator('.quote-form button[type="submit"]').click()
assert(await page.getByRole('status').isVisible())
for (const selector of [
  '.facts',
  '.quote-section',
  '.reports',
  '.process',
  '.contact-wrap',
  '.site-footer',
]) {
  await page.locator(selector).screenshot({
    path: `screenshots/fidelity/mobile-${selector.replaceAll('.', '')}-390.png`,
  })
}
await page.evaluate(() => window.scrollTo(0, 1200))
await page.waitForTimeout(350)
assert(await page.locator('.back-to-top').isVisible())
await page.goto('http://localhost:3000/#quote', { waitUntil: 'networkidle' })
await page.waitForTimeout(250)
await page.screenshot({ path: 'screenshots/fidelity/quote-anchor-390.png', fullPage: false })
const quoteTop = await page
  .locator('#quote')
  .evaluate((element) => element.getBoundingClientRect().top)
assert(quoteTop >= 74, 'Sticky header overlaps the quote anchor')
await page.close()
console.log('Menu, gallery, Escape, video, photo upload and demo-form checks passed.')
console.log(JSON.stringify(results, null, 2))
await browser.close()
