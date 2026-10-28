import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const PARTS_CSV = resolve(import.meta.dirname, 'public/rhic_parts.csv')

// Dev-only endpoint so the hotspot editor can write coordinates back to the CSV.
const savePartsCsv = (): Plugin => ({
  name: 'save-parts-csv',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use('/api/save-parts', (req, res) => {
      if (req.method !== 'POST') { res.statusCode = 405; res.end(); return }
      let body = ''
      req.on('data', chunk => {
        body += chunk
        if (body.length > 1_000_000) req.destroy()
      })
      req.on('end', async () => {
        if (!body.startsWith('id,name,')) { res.statusCode = 400; res.end('Invalid CSV'); return }
        try {
          await writeFile(PARTS_CSV, body, 'utf8')
          res.end('ok')
        } catch (e) {
          res.statusCode = 500
          res.end(String(e))
        }
      })
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  // Relative asset URLs so the build works from any sub-path, e.g. https://<user>.github.io/BNL_VIP/
  base: './',
  plugins: [react(), savePartsCsv()],
})
