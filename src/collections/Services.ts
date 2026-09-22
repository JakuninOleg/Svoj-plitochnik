import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Услуга', plural: 'Услуги' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'cluster', 'fromPrice', 'updatedAt'] },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { description: 'Адрес страницы без слеша: układka-plitki' } },
    {
      name: 'cluster',
      type: 'select',
      required: true,
      options: [
        { label: 'Основная услуга', value: 'core' },
        { label: 'Санузлы', value: 'bathroom' },
        { label: 'Керамогранит и сложные задачи', value: 'technical' },
        { label: 'Дополнительные работы', value: 'additional' },
      ],
    },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'fromPrice', type: 'number', admin: { description: 'Стоимость «от», без ₽' } },
    { name: 'priceUnit', type: 'text', defaultValue: 'м²' },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    { name: 'seoTitle', type: 'text' },
    { name: 'seoDescription', type: 'textarea' },
    { name: 'content', type: 'richText' },
    { name: 'published', type: 'checkbox', defaultValue: false },
  ],
}
