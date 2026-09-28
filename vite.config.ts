import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'register-api-dev',
      configureServer(server) {
        server.middlewares.use('/api/register', (req, res) => {
          if (req.method === 'POST') {
            let body = ''
            req.on('data', chunk => { body += chunk })
            req.on('end', async () => {
              try {
                const data = JSON.parse(body)
                const dataDir = path.join(process.cwd(), 'data')
                if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
                const filePath = path.join(dataDir, 'registrations.json')
                let list = []
                if (fs.existsSync(filePath)) {
                  try { list = JSON.parse(fs.readFileSync(filePath, 'utf8')) } catch { list = [] }
                }
                list.push({ ...data, timestamp: new Date().toISOString() })
                fs.writeFileSync(filePath, JSON.stringify(list, null, 2), 'utf8')
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ success: true, message: 'Registration saved locally' }))
              } catch {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ error: 'Invalid JSON' }))
              }
            })
          } else {
            res.writeHead(405)
            res.end()
          }
        })
      }
    }
  ],
})
