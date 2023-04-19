import 'bootstrap/dist/css/bootstrap.css'
import '@/styles/globals.css'

import { Epilogue } from 'next/font/google'
import Layout from '@/pages/layout'
const epilogue = Epilogue({ subsets: ['latin'] })


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
