import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Объект', plural: 'Объекты' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'city', 'area', 'publishedAt'] },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'cover', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
    { name: 'city', type: 'text', defaultValue: 'Санкт-Петербург' },
    { name: 'area', type: 'text', admin: { description: 'Например: 5,2 м²' } },
    { name: 'duration', type: 'text', admin: { description: 'Например: 12 дней' } },
    { name: 'material', type: 'text' },
    { name: 'task', type: 'textarea' },
    { name: 'result', type: 'textarea' },
    { name: 'services', type: 'relationship', relationTo: 'services', hasMany: true },
    { name: 'videoUrl', type: 'text', admin: { description: 'YouTube, VK Видео, RuTube или прямой URL' } },
    { name: 'publishedAt', type: 'date' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
  ],
}
