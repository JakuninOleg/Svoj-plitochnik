import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Свой плиточник — личный мастер Георгий. Укладка плитки в Санкт-Петербурге и области.',
  title: 'Свой плиточник — укладка плитки в Санкт-Петербурге',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="ru">
      <body>
        {children}
      </body>
    </html>
  )
}
