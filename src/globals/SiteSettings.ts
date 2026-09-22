import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Настройки сайта',
  fields: [
    { name: 'brandName', type: 'text', required: true, defaultValue: 'Свой плиточник' },
    { name: 'masterName', type: 'text', required: true, defaultValue: 'Георгий' },
    { name: 'phone', type: 'text' },
    { name: 'telegramUrl', type: 'text' },
    { name: 'whatsAppUrl', type: 'text' },
    { name: 'serviceArea', type: 'text', defaultValue: 'Санкт-Петербург и Ленинградская область' },
    { name: 'heroTitle', type: 'text', defaultValue: 'Ваш личный мастер по плитке' },
    { name: 'heroDescription', type: 'textarea' },
  ],
}
