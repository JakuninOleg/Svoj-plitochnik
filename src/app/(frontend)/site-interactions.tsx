'use client'
import { useEffect, useRef, useState } from 'react'
import { PhoneInput } from './phone-input'

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const navigationTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const closeAndNavigate = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    setOpen(false)
    if (navigationTimer.current) clearTimeout(navigationTimer.current)
    navigationTimer.current = setTimeout(() => {
      window.history.pushState(null, '', `#${id}`)
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 560)
  }

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  useEffect(
    () => () => {
      if (navigationTimer.current) clearTimeout(navigationTimer.current)
    },
    [],
  )

  return (
    <div className="mobile-menu">
      <button
        className="mobile-menu-trigger"
        type="button"
        aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>
      <div className={`mobile-drawer-shell${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <button
          className="mobile-drawer-backdrop"
          type="button"
          aria-label="Закрыть меню"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
        />
        <aside className="mobile-drawer" id="mobile-navigation" aria-label="Мобильное меню">
          <div className="mobile-drawer-head">
            <img src="/logo-svoy-plitochnik.svg" alt="Свой плиточник" />
            <button type="button" aria-label="Закрыть меню" onClick={() => setOpen(false)}>
              <span />
              <span />
            </button>
          </div>
          <p className="mobile-drawer-kicker">Георгий · мастер-плиточник</p>
          <nav aria-label="Мобильная навигация">
            {[
              ['master', 'О мастере'],
              ['projects', 'Объекты'],
              ['quote', 'Рассчитать по фото'],
              ['reports', 'Видео с объектов'],
              ['reviews', 'Отзывы'],
              ['contacts', 'Контакты'],
            ].map(([id, label], index) => (
              <a key={id} href={'#' + id} onClick={(event) => closeAndNavigate(event, id)}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {label}
                <b aria-hidden="true">↗</b>
              </a>
            ))}
          </nav>
          <div className="mobile-drawer-contact">
            <span>Обсудить задачу лично</span>
            <a href="tel:+79112284417">+7 911 228-44-17</a>
            <a
              className="button red"
              href="#quote"
              onClick={(event) => closeAndNavigate(event, 'quote')}
            >
              Оставить заявку <span>→</span>
            </a>
          </div>
        </aside>
      </div>
    </div>
  )
}

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 700)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <button
      className={`back-to-top${visible ? ' is-visible' : ''}`}
      type="button"
      aria-label="Наверх"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m6 14 6-6 6 6" />
      </svg>
      <span>Наверх</span>
    </button>
  )
}
type Item = { image: string; title: string; meta: string }
const taskOptions = [
  'Ванная или санузел',
  'Кухонный фартук',
  'Пол или стены',
  'Керамогранит и сложные узлы',
]

function TaskSelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const details = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (!details.current?.contains(event.target as Node)) details.current?.removeAttribute('open')
    }
    document.addEventListener('pointerdown', closeOutside)
    return () => document.removeEventListener('pointerdown', closeOutside)
  }, [])

  return (
    <div className="form-control task-control">
      <span className="field-label" id="task-label">
        Что нужно сделать?
      </span>
      <details
        className="custom-select"
        ref={details}
        onKeyDown={(event) => {
          if (event.key === 'Escape') details.current?.removeAttribute('open')
        }}
      >
        <summary aria-labelledby="task-label" aria-haspopup="listbox">
          <span className={value ? '' : 'select-placeholder'}>{value || 'Выберите задачу'}</span>
          <span className="select-chevron" aria-hidden="true" />
        </summary>
        <div className="select-options" role="listbox" aria-labelledby="task-label">
          {taskOptions.map((option) => (
            <button
              type="button"
              role="option"
              aria-selected={value === option}
              key={option}
              onClick={() => {
                onChange(option)
                details.current?.removeAttribute('open')
              }}
            >
              <span>{option}</span>
              {value === option && <span aria-hidden="true">✓</span>}
            </button>
          ))}
        </div>
      </details>
      <input type="hidden" name="task" value={value} />
    </div>
  )
}

export function Gallery({ items, video = false }: { items: Item[]; video?: boolean }) {
  const [selected, setSelected] = useState<number | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const close = () => {
    dialog.current?.close()
    setSelected(null)
  }
  useEffect(() => {
    if (selected !== null) {
      dialog.current?.showModal()
      const old = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = old
      }
    }
  }, [selected])
  return (
    <>
      <div className={video ? 'video-grid' : 'project-grid'}>
        {items.map((item, i) => (
          <button
            className="gallery-card"
            type="button"
            key={item.title}
            onClick={() => setSelected(i)}
          >
            <div className="gallery-image">
              <img src={item.image} alt={item.title} loading="lazy" />
              {video ? (
                <span className="play" aria-label="Воспроизвести">
                  ▶
                </span>
              ) : (
                <span className="image-open" aria-hidden="true">
                  ↗
                </span>
              )}
            </div>
            <b>{item.title}</b>
            {video && (
              <small className="video-caption">
                {i === 0 ? 'Посмотреть, как я работаю' : 'Видео с объекта'} <span>↗</span>
              </small>
            )}
            {!video && <small>{item.meta}</small>}
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="media-dialog"
        onCancel={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
      >
        <button className="dialog-close" onClick={close} aria-label="Закрыть">
          ×
        </button>
        {selected !== null && (
          <>
            <h2>{items[selected].title}</h2>
            {video ? (
              <>
                <video src="/images/video-report-1.mp4" controls autoPlay playsInline />
                <p>Рабочий процесс на объекте: подготовка, укладка и внимание к деталям.</p>
              </>
            ) : (
              <img src={items[selected].image} alt={items[selected].title} />
            )}
          </>
        )}
      </dialog>
    </>
  )
}
export function LeadForm({ variant }: { variant: 'quote' | 'contact' }) {
  const [task, setTask] = useState('')
  const [files, setFiles] = useState<Array<{ name: string; url: string }>>([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.url))
    },
    [files],
  )

  return (
    <form
      className={'lead-form ' + variant + '-form'}
      onSubmit={(e) => {
        e.preventDefault()
        if (variant === 'quote' && !task) {
          setError('Выберите, где нужна плитка.')
          return
        }
        setError('')
        setMessage('Данные заполнены. Позвоните Георгию — он обсудит задачу и расчёт лично.')
      }}
    >
      {variant === 'quote' ? (
        <>
          <div className="quote-fields">
            <TaskSelect value={task} onChange={setTask} />
            <label>
              Площадь, м²
              <input name="area" type="number" min="0.1" step="0.1" placeholder="Например, 5,2" />
            </label>
            <label className="phone-field">
              Ваш телефон
              <PhoneInput />
            </label>
            <button className="button red" type="submit">
              Рассчитать по фото <span>→</span>
            </button>
            <p className="form-note">Предварительно. Точный расчёт — после обсуждения.</p>
          </div>
          <label className="upload-box">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={(e) => {
                const list = Array.from(e.target.files || [])
                if (list.some((f) => f.size > 10 * 1024 * 1024)) {
                  setError('Каждое фото должно быть не больше 10 МБ.')
                  e.target.value = ''
                  setFiles([])
                } else {
                  setFiles(
                    list.map((file) => ({ name: file.name, url: URL.createObjectURL(file) })),
                  )
                  setError('')
                }
              }}
            />
            {files.length ? (
              <span className="photo-previews" aria-label="Предпросмотр выбранных фотографий">
                {files.slice(0, 3).map((file) => (
                  <img src={file.url} alt={`Предпросмотр: ${file.name}`} key={file.url} />
                ))}
                {files.length > 3 && <span className="photo-more">+{files.length - 3}</span>}
              </span>
            ) : (
              <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M3 9h7l2-4h8l2 4h7v20H3Z" />
                <circle cx="16" cy="18" r="6" />
              </svg>
            )}
            <span>{files.length ? `Выбрано фото: ${files.length}` : 'Загрузите фото объекта'}</span>
            <small>
              {files.length
                ? files.map((file) => file.name).join(', ')
                : 'или просто опишите задачу'}
            </small>
            <small>JPG, PNG, WEBP · до 10 МБ</small>
          </label>
        </>
      ) : (
        <>
          <label className="contact-control" htmlFor="contact-name">
            Ваше имя
            <input
              id="contact-name"
              name="name"
              placeholder="Как к вам обращаться"
              autoComplete="given-name"
              required
            />
          </label>
          <label className="contact-control" htmlFor="contact-phone">
            Номер телефона
            <PhoneInput id="contact-phone" />
          </label>
          <label className="contact-control contact-control--wide" htmlFor="contact-question">
            Ваш вопрос
            <textarea
              id="contact-question"
              name="question"
              placeholder="Например: нужно уложить плитку в ванной, около 6 м²"
              rows={3}
            />
          </label>
          <button className="button red" type="submit">
            Обсудить с Георгием <span>→</span>
          </button>
        </>
      )}
      {(message || error) && (
        <p className="form-status" role="status">
          {error || message}
        </p>
      )}
    </form>
  )
}
