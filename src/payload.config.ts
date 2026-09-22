import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { ru } from '@payloadcms/translations/languages/ru'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Leads } from './collections/Leads'
import { Projects } from './collections/Projects'
import { Reviews } from './collections/Reviews'
import { Services } from './collections/Services'
import { VideoReports } from './collections/VideoReports'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const databaseURL = process.env.DATABASE_URL || 'file:./svoj-plitochnik.db'
const databaseAdapter = databaseURL.startsWith('postgres')
  ? postgresAdapter({ pool: { connectionString: databaseURL } })
  : sqliteAdapter({ client: { url: databaseURL }, wal: true })

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  i18n: {
    fallbackLanguage: 'ru',
    supportedLanguages: { ru },
  },
  collections: [Users, Media, Services, Projects, Reviews, VideoReports, Leads],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: databaseAdapter,
  sharp,
  plugins: [],
})
