import React from 'react'
import { Helmet } from 'react-helmet'
import { REACT_APP_API_YANDEX_METRICA_ID } from '@config/index.js'

const YandexMetrica = () => {
  return (
    <Helmet>
      <script type='text/javascript'>
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){
          (m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {
            if (document.scripts[j].src === r) { return; }
          }
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],
          k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(${REACT_APP_API_YANDEX_METRICA_ID}, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true
          });
        `}
      </script>
      <noscript>
        {`
          <div>
            <img 
              src="https://mc.yandex.ru/watch/${REACT_APP_API_YANDEX_METRICA_ID}" 
              style="position: absolute; left: -9999px;" 
              alt=""
            />
          </div>
        `}
      </noscript>
    </Helmet>
  )
}

export default YandexMetrica
