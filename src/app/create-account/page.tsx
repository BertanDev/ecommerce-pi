'use client'

import Head from 'next/head'
import styles from './page.module.css'
import Header from '@/components/Header'

export default function CreateAccount() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>tartCursos</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
          crossOrigin="anonymous"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
          crossOrigin="anonymous"
        />
        <link
          href="data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAA/4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREREREAAAERERERERAAAREREREREAABEQAAABEQAAAAAAAAERAAAAAAAAAREAAAEREREREQAAERERERERAAARERERERAAABEQAAAAAAAAERAAAAAAAAAREAAAAREAABEQAAABEQAAERERERERAAAREREREREAAAEREREREADgBwAAwAMAAMADAADH4wAA/+MAAP/jAADgAwAAwAMAAMAHAADH/wAAx/8AAMfjAADH4wAAwAMAAMADAADgBwAA"
          rel="icon"
          type="image/x-icon"
        />
      </Head>

      <Header />

      <body>
        <form className={styles.formulario}>
          <div className={styles['form-group']}>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              aria-describedby="nameHelp"
              placeholder="Informe seu Nome"
              required
            />
          </div>

          <div className={styles['form-group']}>
            <input
              type="text"
              className="form-control"
              id="exampleInputLastName"
              aria-describedby="lastNameHelp"
              placeholder="Informe seu Sobrenome"
              required
            />
          </div>

          <div className={styles['form-group']}>
            <input
              placeholder="Informe sua data de nascimento"
              type="text"
              className="form-control"
              id="exampleInputDataNascimento"
              aria-describedby="dataNascimentoHelp"
              //   onFocus="(this.type ='date')"
              //   onBlur="if (!this.value) this.type='text'"
              required
            />
          </div>

          <div className={styles['form-group']}>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Informe seu E-mail"
              required
            />
          </div>

          <div className={styles['form-group']}>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Informe sua senha"
              required
            />
          </div>

          <div className={styles['form-group']}>
            <input
              type="password"
              className="form-control"
              id="confirm_password"
              placeholder="Confirme sua senha"
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
              className="form-check-label text-black"
              htmlFor="exampleCheck1"
            >
              Lembrar-me
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-success d-grid gap-2 col-6 mx-auto"
          >
            Registrar conta
          </button>
        </form>
      </body>
    </>
  )
}
