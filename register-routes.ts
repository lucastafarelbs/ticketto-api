import {readdirSync, existsSync} from 'fs'
import path, {dirname} from 'path'
import {fileURLToPath} from 'url'

const registerRoutes = function (fastify: any, dir: string) {
  console.log(import )
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const routesPath = path.join(__dirname, dir)

  readdirSync(routesPath).forEach(folderName => {
    const fullPath = path.join(routesPath, folderName, 'routes.js')
    if (!existsSync(fullPath)) return

    const module = import(fullPath)
    fastify.register(module, {prefix: folderName})
  })
}

export default registerRoutes
