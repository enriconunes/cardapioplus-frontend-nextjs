import "@/styles/globals.css";
import type { AppProps } from "next/app";

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Router from 'next/router'
import { useEffect } from "react";

import { AuthProvider } from "../contexts/AuthContext";

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

NProgress.configure({
  template: `
    <div class="fixed top-0 left-0 right-0 z-50">
      <div class="bar" role="bar" style="height: 5px; background: linear-gradient(to right, #ef4444 0%, #b91c1c 100%);">
        <div class="peg"></div>
      </div>
    </div>`
});

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
      Router.events.on('routeChangeStart', NProgress.start)
      Router.events.on('routeChangeComplete', NProgress.done)
      Router.events.on('routeChangeError', NProgress.done)
      return () => {
        Router.events.off('routeChangeStart', NProgress.start)
        Router.events.off('routeChangeComplete', NProgress.done)
        Router.events.off('routeChangeError', NProgress.done)
      }
    }, [])

  return(
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} />
    </AuthProvider>
  )
}
