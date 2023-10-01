'use client'

import Head from 'next/head'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { api } from '@/lib/axios'

export default function CreateAccount() {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [cpf, setCpf] = useState('')

  async function handleRegister() {
    try {
      const response = await api.post('/authentication/create-user', {
        name,
        last_name: surname,
        email,
        password,
        password_confirmation: confirmPassword,
        birthdate: birthDate,
        cpf: Number(cpf),
      })

      alert('Usuário registrado com sucesso!')

      setName('')
      setSurname('')
      setBirthDate('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setCpf('')
    } catch (error) {
      alert(error.response.data.error)
    }
  }

  const router = useRouter()

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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>

          <div className={styles['form-group']}>
            <input
              placeholder="Informe sua data de nascimento"
              type="date"
              className="form-control"
              id="exampleInputDataNascimento"
              aria-describedby="dataNascimentoHelp"
              //   onFocus="(this.type ='date')"
              //   onBlur="if (!this.value) this.type='text'"
              required
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles['form-group']}>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Informe seu CPF"
              required
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>

          <div className={styles['form-group']}>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Informe sua senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles['form-group']}>
            <input
              type="password"
              className="form-control"
              id="confirm_password"
              placeholder="Confirme sua senha"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            type="button"
            className="btn btn-success d-grid gap-2 col-6 mx-auto"
            onClick={handleRegister}
          >
            Registrar conta
          </button>
          <p
            style={{ color: 'gray', cursor: 'pointer', marginTop: '10px' }}
            onClick={() => router.push('/')}
          >
            voltar para login
          </p>
        </form>
      </body>
    </>
  )
}
