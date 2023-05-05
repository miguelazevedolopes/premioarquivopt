import '@/styles/globals.css'

import localFont from 'next/font/local';
import Layout from '@/pages/layout'
const epilogue = localFont({
  src: '../../public/font/Epilogue-VariableFont_wght.ttf',
  variable: '--font-epilogue',
});




export default function App({ Component, pageProps }) {
  return <>
    <style jsx global>{`
        html {
          font-family: ${epilogue.style.fontFamily};
        }
      `}
    </style>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
}

export { epilogue }