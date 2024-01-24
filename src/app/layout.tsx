'use client'
import 'assets/css/main.css'
import 'react-toastify/dist/ReactToastify.css'
// import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from 'react-query'
import { PropsWithChildren } from 'react'

import NoFirstRender from 'design-systems/Atoms/NoFirstRender'
import { Footer } from 'design-systems/Organisms/Footer'
import Header from 'design-systems/Organisms/Header'
import 'react-multi-carousel/lib/styles.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import RenderView from 'design-systems/Atoms/RenderView'
// function Providers({ children }: PropsWithChildren) {
//   return <></>
// }
const queryClient = new QueryClient()

function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  )
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          name="viewport"
        />
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta content="default" name="apple-mobile-web-app-status-bar-style" />
        <meta content="yes" name="mobile-web-app-capable" />
        <meta content="website" name="og:type" property="og:type" />
        <meta content="summary_large_image" name="twitter:card" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          rel="stylesheet"
          type="text/css"
          // charset="UTF-8"
        />
      </Head>
      <body className="bg-white">
        <ThemeProvider attribute="class">
          <Providers>
            <NoFirstRender>
              <RenderView>{children}</RenderView>
              <ToastContainer />
            </NoFirstRender>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
