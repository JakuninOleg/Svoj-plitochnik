'use client'

import { useState } from 'react'

export default function QuoteForm() {
  const [sent, setSent] = useState(false)
  return (
    <form className="quote-form" onSubmit={(event) => { event.preventDefault(); setSent(true) }}>
      <div><label htmlFor="task">Что нужно сделать?</label><select id="task" name="task" defaultValue=""><option value="" disabled>Выберите задачу</option><option>Ванная или санузел</option><option>Кухонный фартук</option><option>Пол или стены</option><option>Керамогранит / сложный узел</option><option>Другое</option></select></div>
      <div><label htmlFor="area">Площадь, м²</label><input id="area" name="area" placeholder="Например, 5,2" inputMode="decimal" /></div>
      <label className="upload-box"><input type="file" accept="image/*" hidden multiple /><span>⌁</span><b>Загрузите фото объекта</b><small>или просто опишите задачу<br />JPG, PNG, до 10 МБ</small></label>
      <button className="button button-red" type="submit">{sent ? 'Заявка принята' : 'Рассчитать по фото →'}</button>
      <p>{sent ? 'Спасибо. Георгий свяжется с вами.' : 'Обычно отвечаю в течение дня.'}</p>
    </form>
  )
}
