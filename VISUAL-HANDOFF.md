# «Свой плиточник»: реализация по референсу

Источник композиции: присланный пользователем макет `codex-clipboard-76ef1229-4f70-4f7c-bb84-73c34f946fa7.png`.

## Визуальная система

- Основной зелёный `#123f37`, красный `#bc3e2e`, светлый фон `#f6f5f0`, тёмный текст `#213238`.
- Oswald 700: hero и номера этапов. Manrope: заголовки секций и основной текст. Caveat 500: рукописные подписи с отдельным CSS-подчёркиванием.
- Логотип `public/logo-svoy-plitochnik.svg`: геометрический дом-монограмма, красная плитка, кириллическая надпись в контурах. Не зависит от установленного шрифта. Отдельный знак: `public/brand-mark.svg`. Исходный генератор контуров: `scripts/make-brand.py`.
- Desktop hero: сцена не шире 1600 px, контент 1480 px. На 2560 px добавляются внешние поля, фотография не растягивается бесконечно. Сохраняются голова, руки и плитка.
- До 1100 px декоративная правая панель скрыта. До 720 px фотография занимает верх hero, вертикальный градиент соединяет её с текстом ниже, по примеру КЭМЗ.
- Нативное мобильное меню, модальные галереи, видео, выбор фото и демонстрационные формы работают без CMS.

## Изображения

Фото объектов и портрет взяты из существующих локальных материалов проекта. Hero использует ранее сгенерированную иллюстрацию с Георгием; это не документальное фото работы.

Новые декоративные растровые изображения созданы встроенным image_gen, затем перекодированы в WebP без изменения композиции:

1. `public/images/tile-still-life.webp` — светлая стопка плитки.
   Prompt: Photorealistic material still life for the Russian tiler's website Svoy Plitochnik. Portrait 2:3 photograph. Beautiful stack of thin light warm grey stone-textured porcelain tiles, diagonal from lower left to center right, edges sharply detailed. Off-white limestone work surface with delicate grains. Upper half mostly empty pale neutral limestone with gentle side daylight, for adding handwritten dark text in HTML later. Understated real craftsmanship, no luxury props, no text, no logos, no watermarks, no people. Close up product photography, warm white and greige palette. Tiles occupy lower half, beautifully tactile fine cut edges, matching a light cream and deep forest green website.
2. `public/images/measure-still-life.webp` — рулетка, план и образец плитки.
   Prompt: Photorealistic horizontal 3:2 close-up still-life for a real tile installer's website, warm soft natural daylight. A compact black and yellow tape measure with a short tape extended, wooden pencil and a small off-white porcelain tile sample on a simple hand-drawn room floor plan. Objects confined to lower right two thirds. Upper left mostly empty pale warm white plaster/stone tabletop, space for website handwritten text overlay added separately. Honest workbench aesthetic, delicate limestone texture, crisp photographic detail, no people, no logo, no watermark, no text labels, no luxury, no plants.

## Проверки и пределы готовности

Скриншоты всей страницы и hero: `screenshots/fidelity`. Скрипт `scripts/visual-check.mjs` проверяет ширины 2560, 1920, 1366, 1024, 768, 390 и 360; отсутствие горизонтального переполнения, ошибок JS и незагрузившихся картинок; меню, открытие/закрытие галереи, Escape, видео, загрузку фото и демоформу.

Это демонстрационная версия: формы не отправляют заявки, карточки видео открывают один демонстрационный ролик, отзывы явно обозначены как места для будущего контента. Публикации и подключения CMS в этой итерации нет. Контактный номер унаследован от прежней заготовки, его нужно подтвердить до запуска.

Совпадение с референсом оценивается визуально, численная точность 99% не заявляется: исходник является растровой концепцией, а мобильная композиция разработана отдельно.
