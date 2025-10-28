'use client'

import Script from 'next/script'

export const YandexMetrika = () => (
        <Script
                id='yandex-metrika'
                strategy='beforeInteractive'
                dangerouslySetInnerHTML={{
                        __html: `
(function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=104881360', 'ym');

ym(104881360, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
        `
                }}
        />
)

export const YandexMetrikaNoScript = () => (
        <noscript>
                <div>
                        <img
                                src='https://mc.yandex.ru/watch/104881360'
                                style={{ position: 'absolute', left: '-9999px' }}
                                alt=''
                        />
                </div>
        </noscript>
)

export default YandexMetrika
