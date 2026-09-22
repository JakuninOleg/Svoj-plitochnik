import { BackToTop, Gallery, LeadForm, MobileMenu } from './site-interactions'
import './styles.css'
import './refinements.css'

const projects = [
  {
    image: '/images/bathroom-marble.jpg',
    title: 'Ванная комната',
    meta: 'Керамогранит · Ванна и стены',
  },
  {
    image: '/images/stone-project.webp',
    title: 'Душевая зона',
    meta: 'Крупный формат · Скрытые узлы',
  },
  { image: '/images/kitchen.webp', title: 'Кухонный фартук', meta: 'Декоративная плитка' },
  {
    image: '/images/project-02.webp',
    title: 'Плитка на стенах',
    meta: 'Раскладка · Подрезка · Затирка',
  },
  { image: '/images/bathroom-grey.jpg', title: 'Санузел', meta: 'Ниши · Примыкания' },
]
const reports = projects.map((item, i) => ({
  ...item,
  title: [
    'Работа с керамогранитом',
    'Укладка в ванной',
    'Детали раскладки',
    'Плитка на стенах',
    'Готовый санузел',
  ][i],
}))
function Icon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    shield: (
      <>
        <path d="m12 2 8 3v6c0 5-4 8-8 11-4-3-8-6-8-11V5Z" />
        <path d="m8 11 3 3 5-6" />
      </>
    ),
    document: (
      <>
        <path d="M6 2h8l4 4v16H6Z" />
        <path d="M14 2v5h4M9 12h6M9 16h6" />
      </>
    ),
    diamond: (
      <>
        <path d="m2 9 4-6h12l4 6-10 13Z" />
        <path d="M2 9h20M6 3l6 19 6-19M9 3 6 9m9-6 3 6" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="17" rx="1" />
        <path d="M7 2v6m10-6v6M3 11h18M7 15h4m-4 4h8" />
      </>
    ),
    phone: <path d="M5 3 2 5c0 8 9 17 17 17l3-3-5-5-3 2c-3-1-5-3-6-6l2-3Z" />,
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.phone}
    </svg>
  )
}
function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Свой плиточник — главная">
      <img src="/logo-svoy-plitochnik.svg" width="230" height="80" alt="Свой плиточник" />
    </a>
  )
}

function SocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'social-links social-links--compact' : 'social-links'}>
      <a href="https://wa.me/79112284417" aria-label="Написать Георгию в WhatsApp">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.3-4.7a8.5 8.5 0 1 1 16.2-4Z" />
          <path d="M8.2 7.5c.2-.5.5-.5.8-.5h.6l1.1 2.5-.8 1c.8 1.7 2 2.9 3.8 3.6l1-1.1 2.5 1.2v.7c0 .4-.2.8-.6 1-1 .7-2.5.8-4.7-.2-2.1-1-3.8-2.7-4.8-4.8-1-2-.5-3-.1-3.4.3-.4.7-.7 1.2 0Z" />
        </svg>
        {!compact && <span>WhatsApp</span>}
      </a>
      <a href="https://t.me/+79112284417" aria-label="Написать Георгию в Telegram">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m21 4-3 16-6-4-3 3 .5-4.5L18 7 7.5 13 3 11.5Z" />
        </svg>
        {!compact && <span>Telegram</span>}
      </a>
    </div>
  )
}
function Heading({
  title,
  description,
  href,
  link,
}: {
  title: string
  description?: string
  href?: string
  link?: string
}) {
  return (
    <div className="section-head">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {href && (
        <a className="text-link" href={href}>
          {link}
          <span aria-hidden="true"> →</span>
        </a>
      )}
    </div>
  )
}

export default function HomePage() {
  return (
    <div id="top" className="site">
      <header className="site-header shell">
        <Brand />
        <p className="header-region">
          Санкт-Петербург
          <br />и область
        </p>
        <nav aria-label="Основная навигация">
          <a href="#master">О мастере</a>
          <a href="#projects">Объекты</a>
          <a href="#process">Как работаю</a>
          <a href="#reviews">Отзывы</a>
          <a href="#contacts">Контакты</a>
        </nav>
        <a className="header-phone" href="tel:+79112284417">
          <Icon name="phone" />
          <span>
            <b>+7 911 228-44-17</b>
            <small>Пишите, отвечаю лично</small>
          </span>
        </a>
        <a className="button red header-cta" href="#quote">
          Оставить заявку
        </a>
        <MobileMenu />
      </header>
      <main>
        <section className="hero-wrap" aria-labelledby="hero-title">
          <div className="hero-stage">
            <div className="hero-scene">
              <img
                className="hero-image"
                src="/images/georgiy-laying-tile.webp"
                alt="Георгий укладывает крупную плитку на подготовленное основание"
                fetchPriority="high"
              />
              <div className="hero-wash" />
            </div>
            <p className="hero-person handwritten">
              Георгий.
              <br />
              Ваш плиточник.<span aria-hidden="true">⤵</span>
            </p>
            <div className="hero-copy">
              <p className="eyebrow">
                Плитка <em>·</em> Санузлы <em>·</em> Мозаика <em>·</em> Ремонт
              </p>
              <h1 id="hero-title">
                Ваш личный
                <br />
                мастер по плитке<span>.</span>
              </h1>
              <p className="hero-description">
                Укладываю плитку в квартирах и домах
                <br className="desktop-break" /> Санкт-Петербурга и области. Сам веду объект —
                <br className="desktop-break" /> от замера и сметы до готового результата.
              </p>
              <div className="hero-actions">
                <a className="button red" href="#quote">
                  Рассчитать по фото <span>→</span>
                </a>
                <a className="hero-secondary" href="#projects">
                  Реальные объекты <span>→</span>
                </a>
              </div>
              <p className="handwritten hero-signature">
                Хорошая плитка
                <br />
                <span>начинается с хорошего мастера</span>
              </p>
            </div>
            <aside className="hero-material">
              <p className="handwritten">
                Качество
                <br />в деталях
              </p>
              <img
                src="/images/tile-still-life.webp"
                alt="Фактура и аккуратные кромки керамогранита"
              />
              <p className="material-list">
                Плитка
                <br />
                Санузлы
                <br />
                Мозаика
                <br />
                Ремонт
              </p>
              <span className="brand-square" />
            </aside>
          </div>
        </section>
        <section className="facts">
          <div className="shell facts-grid">
            {[
              ['shield', 'Личная ответственность', 'Один мастер на весь объект'],
              ['document', 'Честная смета', 'Обсуждаем состав работ заранее'],
              ['diamond', 'Аккуратная работа', 'С уважением к вашему дому'],
              ['calendar', 'Удобные сроки', 'По предварительной договорённости'],
            ].map(([icon, title, description]) => (
              <div className="fact" key={icon}>
                <Icon name={icon} />
                <div>
                  <b>{title}</b>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="shell section projects" id="projects">
          <Heading
            title="Реальные объекты"
            description="Обычные квартиры. Настоящие задачи. Живые фото."
            href="#quote"
            link="Обсудить ваш объект"
          />
          <Gallery items={projects} />
        </section>
        <section className="master-wrap" id="master">
          <div className="shell master-grid">
            <div className="master-portrait">
              <img src="/images/georgiy.jpg" alt="Георгий на своём объекте" loading="lazy" />
              <p className="master-person handwritten">
                Георгий.
                <br />
                Ваш плиточник.
              </p>
              <svg className="master-arrow" viewBox="0 0 120 95" aria-hidden="true">
                <path d="M108 10c-20 8-36 21-49 38-10 12-20 24-38 31" />
                <path d="m22 66-2 14 14 1" />
              </svg>
            </div>
            <div className="master-copy">
              <span className="master-kicker">О мастере</span>
              <h2>Более 20 лет опыта</h2>
              <p>
                Меня зовут Георгий. Плиточными работами занимаюсь с 2006 года. Сам оцениваю объект,
                составляю смету и контролирую выполнение работы — без посредников и бригад.
              </p>
              <p>Для меня важно, чтобы результат радовал вас долгие годы.</p>
              <a className="button sand" href="#contacts">
                Подробнее обо мне <span>→</span>
              </a>
              <div className="master-stats" aria-label="Опыт Георгия">
                <div>
                  <b>20+</b>
                  <span>лет опыта</span>
                </div>
                <div>
                  <b>500+</b>
                  <span>выполненных объектов</span>
                </div>
                <div>
                  <b>5 лет</b>
                  <span>гарантии на работы</span>
                </div>
              </div>
            </div>
            <aside className="master-note" aria-label="Принцип работы">
              <div className="master-note-copy">
                <p>
                  Плитка —
                  <br />
                  простая вещь,
                  <br />
                  которая делает
                  <br />
                  дом уютнее.
                </p>
                <span className="brand-square" />
              </div>
              <img src="/images/tile-still-life.webp" alt="Фактура светлой плитки" loading="lazy" />
            </aside>
          </div>
        </section>
        <section className="shell quote-section" id="quote">
          <div className="quote-main">
            <Heading
              title="С чего начнём ваш ремонт?"
              description="Покажите помещение — разберём вашу задачу и состав работ. Можно начать с пары фотографий."
            />
            <LeadForm variant="quote" />
          </div>
          <aside className="quote-aside">
            <p className="handwritten">
              Покажите, что уже есть.
              <br />
              Напишите, что хотите.
              <br />
              Остальное — посчитаю.
            </p>
          </aside>
        </section>
        <section className="shell section reports" id="reports">
          <Heading
            title="Работа, которую видно"
            description="Видео с объектов: от подготовки основания до последнего шва."
            href="#reports"
            link="Смотреть отчёты"
          />
          <Gallery items={reports} video />
        </section>
        <section className="shell section reviews" id="reviews">
          <Heading
            title="За каждым объектом — человек"
            description="Истории ремонта — через задачу, детали работы и готовый результат."
          />
          <div className="review-grid">
            {[
              {
                name: 'Мария',
                project: 'Ванная комната',
                avatar: 'review-avatar--one',
                image: projects[0].image,
                text: 'Георгий сделал нам ванную комнату под ключ. Всё прошло спокойно, без лишней суеты. Результатом очень довольны.',
              },
              {
                name: 'Илья',
                project: 'Кухонный фартук',
                avatar: 'review-avatar--two',
                image: projects[2].image,
                text: 'Нужен был фартук на кухне. Получилось аккуратно и в срок. Георгий подсказал по раскладке и материалам.',
              },
              {
                name: 'Екатерина',
                project: 'Ремонт санузла',
                avatar: 'review-avatar--three',
                image: projects[4].image,
                text: 'Приятно, когда мастер сам предлагает решения и думает о деталях. Всегда был на связи, будем обращаться ещё.',
              },
            ].map((r) => (
              <article className="review" key={r.name}>
                <img className="review-project" src={r.image} alt={r.project} loading="lazy" />
                <div className="review-body">
                  <div className="review-author">
                    <span className={`review-avatar ${r.avatar}`} aria-hidden="true" />
                    <span>
                      <b>{r.name}</b>
                      <small>Санкт-Петербург</small>
                    </span>
                    <span className="review-stars" aria-label="Оценка 5 из 5">
                      ★★★★★
                    </span>
                  </div>
                  <p>{r.text}</p>
                  <a href="#projects" className="text-link">
                    {r.project} <span>↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="shell section process" id="process">
          <Heading
            title="Всё понятно. На каждом этапе."
            description="От первого сообщения до готового объекта — на связи со мной."
          />
          <ol>
            {[
              ['Обсуждаем задачу', 'Вы рассказываете, что нужно. Смотрим фото, уточняем детали.'],
              ['Считаем и планируем', 'Согласуем объём, материалы и сроки.'],
              ['Выполняю работу', 'Работаю лично, аккуратно и с соблюдением договорённостей.'],
              ['Вы принимаете результат', 'Проверяем вместе, отвечаю на вопросы. Объект сдан.'],
            ].map(([title, text], index) => (
              <li key={title}>
                <img
                  className="process-photo"
                  src={
                    [
                      '/images/bathroom-marble.jpg',
                      '/images/measure-still-life.webp',
                      '/images/project-02.webp',
                      '/images/bathroom-grey.jpg',
                    ][index]
                  }
                  alt=""
                  loading="lazy"
                />
                <div>
                  <b>{title}</b>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section className="contact-wrap" id="contacts">
          <div className="shell contact-grid">
            <div className="contact-art">
              <img src="/images/tile-still-life.webp" alt="" loading="lazy" />
              <p className="handwritten">
                Сделаю
                <br />
                как для себя
              </p>
            </div>
            <div className="contact-copy">
              <span className="contact-kicker">Связаться с Георгием</span>
              <h2>
                Давайте обсудим
                <br />
                вашу задачу.
              </h2>
              <p>
                Не знаете, с чего начать? Расскажите, что хотите изменить. Я помогу разобраться.
              </p>
              <a href="tel:+79112284417" className="contact-direct">
                +7 911 228-44-17
              </a>
              <SocialLinks />
            </div>
            <LeadForm variant="contact" />
          </div>
        </section>
      </main>
      <footer className="shell site-footer">
        <div className="footer-top">
          <Brand />
          <nav aria-label="Навигация в подвале">
            <a href="#master">О мастере</a>
            <a href="#projects">Объекты</a>
            <a href="#process">Как работаю</a>
            <a href="#reviews">Отзывы</a>
            <a href="#contacts">Контакты</a>
          </nav>
          <div className="footer-contacts">
            <a className="header-phone" href="tel:+79112284417">
              <Icon name="phone" />
              <span>
                <b>+7 911 228-44-17</b>
                <small>Пишите, отвечаю лично</small>
              </span>
            </a>
            <SocialLinks compact />
          </div>
        </div>
        <div className="footer-bottom">
          <p>Свой плиточник. Санкт-Петербург и область.</p>
          <p>Надёжный ремонт. Настоящие люди.</p>
        </div>
      </footer>
      <BackToTop />
    </div>
  )
}
