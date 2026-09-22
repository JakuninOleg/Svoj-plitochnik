import type { CollectionConfig } from 'payload'

export const VideoReports: CollectionConfig = {
  slug: 'video-reports',
  labels: { singular: 'Видеоотчёт', plural: 'Видеоотчёты' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'project', 'duration', 'publishedAt'] },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'thumbnail', type: 'upload', relationTo: 'media', required: true },
    { name: 'videoUrl', type: 'text', required: true },
    { name: 'duration', type: 'text', admin: { description: 'Например: 1:24' } },
    { name: 'project', type: 'relationship', relationTo: 'projects' },
    { name: 'publishedAt', type: 'date' },
  ],
}
