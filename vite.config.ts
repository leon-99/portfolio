import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = env.VITE_SITE_URL?.replace(/\/$/, '') ?? ''
  const ogImage = siteUrl ? `${siteUrl}/preview.png` : '/preview.png'

  return {
    plugins: [
      vue(),
      {
        name: 'html-social-meta',
        transformIndexHtml(html) {
          let result = html.replaceAll('__OG_IMAGE__', ogImage)

          if (siteUrl) {
            result = result.replaceAll('__SITE_URL__', siteUrl)
          } else {
            result = result.replace(
              /\s*<meta property="og:url" content="__SITE_URL__" \/>\n?/,
              '',
            )
          }

          return result
        },
      },
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
