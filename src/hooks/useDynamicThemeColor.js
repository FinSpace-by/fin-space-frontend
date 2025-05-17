import { useEffect } from 'react'

const useDynamicThemeColor = (color) => {
  useEffect(() => {
    let themeColorMeta = document.querySelector('meta[name="theme-color"]')

    if (!themeColorMeta) {
      themeColorMeta = document.createElement('meta')
      themeColorMeta.name = 'theme-color'
      document.head.appendChild(themeColorMeta)
    }

    const originalThemeColor = themeColorMeta.content || '#111111'
    themeColorMeta.content = color

    const pwaThemeMeta = document.createElement('meta')
    pwaThemeMeta.name = 'theme-color'
    pwaThemeMeta.content = color
    pwaThemeMeta.setAttribute('data-dynamic-theme', 'true')
    document.head.appendChild(pwaThemeMeta)

    return () => {
      themeColorMeta.content = originalThemeColor

      const addedMeta = document.querySelector('meta[data-dynamic-theme="true"]')
      if (addedMeta) {
        addedMeta.remove()
      }
    }
  }, [color])
}

export default useDynamicThemeColor
