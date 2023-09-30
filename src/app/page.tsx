'use client'

import Head from 'next/head'
import styles from './page.module.css'
import Script from 'next/script'
import { api } from '@/lib/axios'
import { useState } from 'react'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  async function handleLogin(e: any) {
    e.preventDefault()

    try {
      const response = await api.post('/authentication/authenticate', {
        email,
        password,
        user_type: 1,
      })

      console.log(response.data)

      const token = response.data.token

      api.defaults.headers.common.Authorization = `Bearer ${token}`
      Cookie.set('auth_token', token)
      router.push('/products')
    } catch {
      alert('Informe os dados corretamente!')
    }
  }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>tartCursos</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
          crossOrigin="anonymous"
        />
        <link
          href="data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAA/4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREREREAAAERERERERAAAREREREREAABEQAAABEQAAAAAAAAERAAAAAAAAAREAAAEREREREQAAERERERERAAARERERERAAABEQAAAAAAAAERAAAAAAAAAREAAAAREAABEQAAABEQAAERERERERAAAREREREREAAAEREREREADgBwAAwAMAAMADAADH4wAA/+MAAP/jAADgAwAAwAMAAMAHAADH/wAAx/8AAMfjAADH4wAAwAMAAMADAADgBwAA"
          rel="icon"
          type="image/x-icon"
        />
      </Head>
      <header className={styles.cabecalho}>
        <div className="container py-2">
          <div className="row">
            <div className="col order-first">
              <ul className="nav justify-content-center p-lg-2">
                <li className="nav-item">
                  <a
                    className={`${styles['nav-link']} fw-bold text-light l`}
                    aria-current="page"
                    href="#"
                  >
                    <h2>Start Cursos</h2>
                  </a>
                </li>
              </ul>
            </div>

            <div className="col">
              <ul className="nav justify-content-center p-2 gap-md-4 mt-2">
                <li className="nav-item">
                  <a
                    className={`${styles['nav-link']} fw-bold text-light`}
                    aria-current="page"
                    href="#"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`${styles['nav-link']} fw-bold text-light`}
                    href="#"
                  >
                    Cursos
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`${styles['nav-link']} fw-bold text-light`}
                    href="#"
                  >
                    Planos
                  </a>
                </li>
              </ul>
            </div>

            <div className="col order-last">
              <ul className="nav justify-content-center p-lg-2 mt-2">
                <li className="nav-item">
                  <a
                    className={`${styles['nav-link']} fw-bold text-light l`}
                    aria-current="page"
                    href="#"
                  >
                    Usuário
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <body className={styles.body}>
        <form className={styles.formulario}>
          <div className={styles['form-group']}>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Informe seu E-mail"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div className={styles['form-group']}>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Informe sua senha"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <div className={`${styles['form-group']} form-check`}>
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label
              className="form-check-label text-dark"
              htmlFor="exampleCheck1"
            >
              Lembrar-me
            </label>
          </div>
          <button
            type="submit"
            className={`btn btn-primary d-grid gap-2 col-6 mx-auto`}
            onClick={handleLogin}
          >
            Entrar
          </button>

          <div className="text-center">
            <p className="text-dark py-4">
              Ainda não tem conta? Crie já a sua ⬇️
            </p>
            <a
              className={`btn btn-outline-success`}
              onClick={() => router.push(`/create-account`)}
              role="button"
            >
              Cadastrar-se
            </a>
          </div>
        </form>
      </body>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        crossOrigin="anonymous"
      ></Script>
    </>
  )
}
