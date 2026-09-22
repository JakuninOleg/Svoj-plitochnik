import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: { singular: 'Заявка', plural: 'Заявки' },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'phone', 'taskType', 'status', 'createdAt'] },
  access: { read: ({ req }) => Boolean(req.user), create: () => true, update: ({ req }) => Boolean(req.user), delete: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'name', type: 'text' },
    { name: 'phone', type: 'text', required: true },
    { name: 'taskType', type: 'text' },
    { name: 'area', type: 'number' },
    { name: 'comment', type: 'textarea' },
    { name: 'photos', type: 'upload', relationTo: 'media', hasMany: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'Новая', value: 'new' },
        { label: 'В работе', value: 'in-progress' },
        { label: 'Договорились', value: 'won' },
        { label: 'Не подошло', value: 'lost' },
      ],
    },
  ],
}
