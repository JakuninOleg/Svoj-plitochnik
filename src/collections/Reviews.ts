import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  labels: { singular: 'Отзыв', plural: 'Отзывы' },
  admin: { useAsTitle: 'clientName', defaultColumns: ['clientName', 'format', 'city', 'approved'] },
  fields: [
    { name: 'clientName', type: 'text', required: true },
    { name: 'city', type: 'text', defaultValue: 'Санкт-Петербург' },
    { name: 'text', type: 'textarea' },
    { name: 'source', type: 'text', admin: { description: 'Например: Профи.ру, Яндекс Карты, письменный отзыв' } },
    {
      name: 'format',
      type: 'select',
      required: true,
      defaultValue: 'text',
      options: [
        { label: 'Текст', value: 'text' },
        { label: 'Видеоотзыв', value: 'video' },
        { label: 'Скан / фотография отзыва', value: 'scan' },
      ],
    },
    { name: 'avatarOrScan', type: 'upload', relationTo: 'media' },
    { name: 'videoUrl', type: 'text' },
    { name: 'project', type: 'relationship', relationTo: 'projects' },
    { name: 'approved', type: 'checkbox', defaultValue: false, label: 'Есть согласие на публикацию' },
    { name: 'publishedAt', type: 'date' },
  ],
}
