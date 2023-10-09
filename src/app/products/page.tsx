'use client'

import Head from 'next/head'
import Script from 'next/script'

import styles from './page.module.css'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'

export default function Products() {
  const [plans, setPlans] = useState([
    { name: '', description: '', price: 0.0 },
    { name: '', description: '', price: 0.0 },
    { name: '', description: '', price: 0.0 },
  ])

  const [categories, setCategories] = useState<{ name: string }[]>([
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
  ])

  const [courses, setCourses] = useState([])

  const [category, setCategory] = useState<number | null>(null)
  const [categoryText, setCategoryText] = useState('Selecionar categoria')

  const [categoryCourses, setCategoryCourses] = useState([])

  function handleChangeCategory(id: number, name: string) {
    setCategoryText(name)
    setCategory(id)
  }

  const token = Cookies.get('auth_token')
  const router = useRouter()

  useEffect(() => {
    const changeCourses = courses.filter(
      (course: { category_id: string }) =>
        course.category_id === String(category),
    )

    setCategoryCourses(changeCourses)
  }, [category, courses])

  useEffect(() => {
    async function getPlans() {
      const response = await fetch(
        'https://www.vitorads.com.br/subscription-plan/get-all',
        {
          method: 'GET',
          headers: new Headers({
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          }),
        },
      )

      const plans = await response.json()

      setPlans(() =>
        plans.subscriptionPlans.reduce((acumulador: any, valorAtual: any) => {
          return acumulador.concat(valorAtual)
        }, []),
      )
    }

    async function getCategories() {
      const response = await fetch(
        'https://www.vitorads.com.br/category/get-all',
        {
          method: 'GET',
          headers: new Headers({
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          }),
        },
      )

      const categories = await response.json()

      setCategories(() =>
        categories.categories.reduce((acumulador: any, valorAtual: any) => {
          return acumulador.concat(valorAtual)
        }, []),
      )
    }

    async function getCourses() {
      const response = await fetch(
        'https://www.vitorads.com.br/product/get-all',
        {
          method: 'GET',
          headers: new Headers({
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          }),
        },
      )

      const courses = await response.json()

      setCourses(() =>
        courses.products.reduce((acumulador: any, valorAtual: any) => {
          return acumulador.concat(valorAtual)
        }, []),
      )
    }

    getCourses()
    getCategories()
    getPlans()
  }, [token])

  function chooseCourse(id: { id: number }) {
    router.push(`/course-detail?id=${id.id}`)
  }

  const firstCategoryCourses = courses.filter(
    (item: { category_id: string }) => item.category_id === '1',
  )

  const secondCategoryCourses = courses.filter(
    (item: { category_id: string }) => item.category_id === '2',
  )

  const thirdCategoryCourses = courses.filter(
    (item: { category_id: string }) => item.category_id === '7',
  )

  const fourthCategoryCourses = courses.filter(
    (item: { category_id: string }) => item.category_id === '8',
  )

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>tartCursos</title>

        <link
          href="data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAA/4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREREREAAAERERERERAAAREREREREAABEQAAABEQAAAAAAAAERAAAAAAAAAREAAAEREREREQAAERERERERAAARERERERAAABEQAAAAAAAAERAAAAAAAAAREAAAAREAABEQAAABEQAAERERERERAAAREREREREAAAEREREREADgBwAAwAMAAMADAADH4wAA/+MAAP/jAADgAwAAwAMAAMAHAADH/wAAx/8AAMfjAADH4wAAwAMAAMADAADgBwAA"
          rel="icon"
          type="image/x-icon"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
          crossOrigin="anonymous"
        />
      </Head>

      <div>
        <Header />

        <section className={`${styles.planos} w-auto`}>
          <div className="row">
            <div className="col-sm-3">
              <div className="card border-black">
                <div className="card-body">
                  <div className={styles.planobronze}>
                    <h3 className="card-header">{plans[0].name}</h3>
                  </div>
                  <p className="card-text">{plans[0].description}</p>
                  {/* <p className="card-text">- Renovação Trimestral</p>
                  <p className="card-text">- Certificados</p> */}
                  <h2 className="card-text ">
                    R$ {plans[0].price.toString().replace('.', ',')}
                  </h2>
                  <a
                    href="#"
                    className="btn border-light-subtle btn-outline-success"
                  >
                    Conhecer mais ⓘ
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="card border-black">
                <div className="card-body">
                  <h3 className="card-header bg-light">{plans[1].name}</h3>
                  <p className="card-text">{plans[1].description}</p>
                  {/* <p className="card-text">- 10 cursos disponíveis</p>
                  <p className="card-text">- Renovação Trimestral</p>
                  <p className="card-text">- Certificados</p> */}
                  <h2 className="card-text">
                    R$ {plans[1].price.toString().replace('.', ',')}
                  </h2>
                  <a
                    href="#"
                    className="btn border-light-subtle btn-outline-success"
                  >
                    Conhecer mais ⓘ
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="card border-black">
                <div className="card-body">
                  <h3 className="card-header bg-warning">{plans[2].name}</h3>
                  <p className="card-text">{plans[2].description}</p>
                  {/* <p className="card-text">- 20 cursos disponíveis</p>
                  <p className="card-text">- Renovação Trimestral</p>
                  <p className="card-text">- Certificados</p> */}
                  <h2 className="card-text">
                    R$ {plans[2].price.toString().replace('.', ',')}
                  </h2>
                  <a
                    href="#"
                    className="btn border-light-subtle btn-outline-success"
                  >
                    Conhecer mais ⓘ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className={`dropdown ${styles.categoria} mt-5`}>
          <button
            className="btn btn-lg border-black dropdown-toggle text-black"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {categoryText}
          </button>
          <ul className="dropdown-menu">
            {categories?.map((category: any) => {
              return (
                <li key={category.id}>
                  <button
                    className="dropdown-item"
                    onClick={() =>
                      handleChangeCategory(category.id, category.name)
                    }
                  >
                    {category.name}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <section className="conteudoPrincipal">
          <div className="container">
            <h2 className={`text-black ${styles.subtitulo}`}>Nossos cursos</h2>
            <nav>
              <ul className={styles['conteudoPrincipal-cursos']}>
                {categoryCourses.length === 0 && (
                  <p className={styles.aviso}>
                    Busque um curso pela sua categoria
                  </p>
                )}
                {categoryCourses.map((course: { id: number; name: string }) => {
                  return (
                    <li
                      className={styles['conteudoPrincipal-cursos-link']}
                      key={course.id}
                      onClick={() => chooseCourse({ id: course.id })}
                    >
                      <a className="text-dark">{course.name}</a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          <footer className={styles.rodapePrincipal}>
            <div className="container">
              <section>
                <h3 className="subtitulo">Mapa de cursos</h3>
                <nav className={styles['rodapePrincipal-navMap-list']}>
                  <div className={styles.alinha}>
                    <h4
                      className={`${styles['navmap-list-title']} ${styles['navmap-list-title-backend']}`}
                    >
                      {categories[0].name}
                    </h4>

                    {firstCategoryCourses.map(
                      (course: { id: number; name: string }) => {
                        return (
                          <a
                            className={styles['rodapePrincipal-navMap-link']}
                            href="#"
                            key={course.id}
                            onClick={() => chooseCourse({ id: course.id })}
                          >
                            {course.name}
                          </a>
                        )
                      },
                    )}
                  </div>

                  <div className={styles.alinha}>
                    <h4
                      className={`${styles['navmap-list-title']} ${styles['navmap-list-title-frontend']}`}
                    >
                      {categories[1].name}
                    </h4>
                    {secondCategoryCourses.map(
                      (course: { id: number; name: string }) => {
                        return (
                          <a
                            className={styles['rodapePrincipal-navMap-link']}
                            href="#"
                            key={course.id}
                            onClick={() => chooseCourse({ id: course.id })}
                          >
                            {course.name}
                          </a>
                        )
                      },
                    )}
                  </div>

                  <div className={styles.alinha}>
                    <h4
                      className={`${styles['navmap-list-title']} ${styles['navmap-list-title-framework']}`}
                    >
                      {categories[2].name}
                    </h4>
                    {thirdCategoryCourses.map(
                      (course: { id: number; name: string }) => {
                        return (
                          <a
                            className={styles['rodapePrincipal-navMap-link']}
                            href="#"
                            key={course.id}
                            onClick={() => chooseCourse({ id: course.id })}
                          >
                            {course.name}
                          </a>
                        )
                      },
                    )}
                  </div>

                  <div className={styles.alinha}>
                    <h4
                      className={`${styles['navmap-list-title']} ${styles['navmap-list-title-bancoDeDados']}`}
                    >
                      {categories[3].name}
                    </h4>
                    {fourthCategoryCourses.map(
                      (course: { id: number; name: string }) => {
                        return (
                          <a
                            className={styles['rodapePrincipal-navMap-link']}
                            href="#"
                            key={course.id}
                            onClick={() => chooseCourse({ id: course.id })}
                          >
                            {course.name}
                          </a>
                        )
                      },
                    )}
                  </div>
                </nav>
              </section>
            </div>
          </footer>

          <footer className="text-center text-lg-start bg-light text-muted mt-2">
            <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
              <div>
                <a href="" className="me-4 text-reset">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="" className="me-4 text-reset">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="" className="me-4 text-reset">
                  <i className="fab fa-google"></i>
                </a>
                <a href="" className="me-4 text-reset">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="" className="me-4 text-reset">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="" className="me-4 text-reset">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </section>

            <section className="">
              <div className="container text-center text-md-start mt-5">
                <div className="row mt-3">
                  <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                    <h6 className="text-uppercase fw-bold mb-4">
                      <i className="fas fa-gem me-3"></i> Start Cursos
                    </h6>
                    <p>
                      Bem-vindo ao Start Cursos
                      <br />
                      Sua porta de entrada para o conhecimento e desenvolvimento
                      pessoal! Aqui, a busca pelo aprendizado encontra a
                      conveniência do mundo digital. Na Start Cursos,
                      acreditamos que o aprendizado é uma jornada contínua, e
                      estamos comprometidos em fornecer a você as ferramentas
                      necessárias para começar e avançar nesse caminho.
                    </p>
                  </div>

                  <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                    <h6 className="text-uppercase fw-bold mb-4">
                      Redes Sociais
                    </h6>
                    <p>
                      <a href="#!" className="text-reset">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="50"
                          height="50"
                          viewBox="0 0 50 50"
                        >
                          <path d="M 9 4 C 6.2504839 4 4 6.2504839 4 9 L 4 41 C 4 43.749516 6.2504839 46 9 46 L 25.832031 46 A 1.0001 1.0001 0 0 0 26.158203 46 L 31.832031 46 A 1.0001 1.0001 0 0 0 32.158203 46 L 41 46 C 43.749516 46 46 43.749516 46 41 L 46 9 C 46 6.2504839 43.749516 4 41 4 L 9 4 z M 9 6 L 41 6 C 42.668484 6 44 7.3315161 44 9 L 44 41 C 44 42.668484 42.668484 44 41 44 L 33 44 L 33 30 L 36.820312 30 L 38.220703 23 L 33 23 L 33 21 C 33 20.442508 33.05305 20.398929 33.240234 20.277344 C 33.427419 20.155758 34.005822 20 35 20 L 38 20 L 38 14.369141 L 37.429688 14.097656 C 37.429688 14.097656 35.132647 13 32 13 C 29.75 13 27.901588 13.896453 26.71875 15.375 C 25.535912 16.853547 25 18.833333 25 21 L 25 23 L 22 23 L 22 30 L 25 30 L 25 44 L 9 44 C 7.3315161 44 6 42.668484 6 41 L 6 9 C 6 7.3315161 7.3315161 6 9 6 z M 32 15 C 34.079062 15 35.38736 15.458455 36 15.701172 L 36 18 L 35 18 C 33.849178 18 32.926956 18.0952 32.150391 18.599609 C 31.373826 19.104024 31 20.061492 31 21 L 31 25 L 35.779297 25 L 35.179688 28 L 31 28 L 31 44 L 27 44 L 27 28 L 24 28 L 24 25 L 27 25 L 27 21 C 27 19.166667 27.464088 17.646453 28.28125 16.625 C 29.098412 15.603547 30.25 15 32 15 z"></path>
                        </svg>
                      </a>
                    </p>
                    <p>
                      <a href="#!" className="text-reset">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="50"
                          height="50"
                          viewBox="0 0 50 50"
                        >
                          <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"></path>
                        </svg>
                      </a>
                    </p>
                    <p>
                      <a href="#!" className="text-reset">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="50"
                          height="50"
                          viewBox="0 0 50 50"
                        >
                          <path d="M 34.21875 5.46875 C 28.238281 5.46875 23.375 10.332031 23.375 16.3125 C 23.375 16.671875 23.464844 17.023438 23.5 17.375 C 16.105469 16.667969 9.566406 13.105469 5.125 7.65625 C 4.917969 7.394531 4.597656 7.253906 4.261719 7.277344 C 3.929688 7.300781 3.632813 7.492188 3.46875 7.78125 C 2.535156 9.386719 2 11.234375 2 13.21875 C 2 15.621094 2.859375 17.820313 4.1875 19.625 C 3.929688 19.511719 3.648438 19.449219 3.40625 19.3125 C 3.097656 19.148438 2.726563 19.15625 2.425781 19.335938 C 2.125 19.515625 1.941406 19.839844 1.9375 20.1875 L 1.9375 20.3125 C 1.9375 23.996094 3.84375 27.195313 6.65625 29.15625 C 6.625 29.152344 6.59375 29.164063 6.5625 29.15625 C 6.21875 29.097656 5.871094 29.21875 5.640625 29.480469 C 5.410156 29.742188 5.335938 30.105469 5.4375 30.4375 C 6.554688 33.910156 9.40625 36.5625 12.9375 37.53125 C 10.125 39.203125 6.863281 40.1875 3.34375 40.1875 C 2.582031 40.1875 1.851563 40.148438 1.125 40.0625 C 0.65625 40 0.207031 40.273438 0.0507813 40.71875 C -0.109375 41.164063 0.0664063 41.660156 0.46875 41.90625 C 4.980469 44.800781 10.335938 46.5 16.09375 46.5 C 25.425781 46.5 32.746094 42.601563 37.65625 37.03125 C 42.566406 31.460938 45.125 24.226563 45.125 17.46875 C 45.125 17.183594 45.101563 16.90625 45.09375 16.625 C 46.925781 15.222656 48.5625 13.578125 49.84375 11.65625 C 50.097656 11.285156 50.070313 10.789063 49.777344 10.445313 C 49.488281 10.101563 49 9.996094 48.59375 10.1875 C 48.078125 10.417969 47.476563 10.441406 46.9375 10.625 C 47.648438 9.675781 48.257813 8.652344 48.625 7.5 C 48.75 7.105469 48.613281 6.671875 48.289063 6.414063 C 47.964844 6.160156 47.511719 6.128906 47.15625 6.34375 C 45.449219 7.355469 43.558594 8.066406 41.5625 8.5 C 39.625 6.6875 37.074219 5.46875 34.21875 5.46875 Z M 34.21875 7.46875 C 36.769531 7.46875 39.074219 8.558594 40.6875 10.28125 C 40.929688 10.53125 41.285156 10.636719 41.625 10.5625 C 42.929688 10.304688 44.167969 9.925781 45.375 9.4375 C 44.679688 10.375 43.820313 11.175781 42.8125 11.78125 C 42.355469 12.003906 42.140625 12.53125 42.308594 13.011719 C 42.472656 13.488281 42.972656 13.765625 43.46875 13.65625 C 44.46875 13.535156 45.359375 13.128906 46.3125 12.875 C 45.457031 13.800781 44.519531 14.636719 43.5 15.375 C 43.222656 15.578125 43.070313 15.90625 43.09375 16.25 C 43.109375 16.65625 43.125 17.058594 43.125 17.46875 C 43.125 23.71875 40.726563 30.503906 36.15625 35.6875 C 31.585938 40.871094 24.875 44.5 16.09375 44.5 C 12.105469 44.5 8.339844 43.617188 4.9375 42.0625 C 9.15625 41.738281 13.046875 40.246094 16.1875 37.78125 C 16.515625 37.519531 16.644531 37.082031 16.511719 36.683594 C 16.378906 36.285156 16.011719 36.011719 15.59375 36 C 12.296875 35.941406 9.535156 34.023438 8.0625 31.3125 C 8.117188 31.3125 8.164063 31.3125 8.21875 31.3125 C 9.207031 31.3125 10.183594 31.1875 11.09375 30.9375 C 11.53125 30.808594 11.832031 30.402344 11.816406 29.945313 C 11.800781 29.488281 11.476563 29.097656 11.03125 29 C 7.472656 28.28125 4.804688 25.382813 4.1875 21.78125 C 5.195313 22.128906 6.226563 22.402344 7.34375 22.4375 C 7.800781 22.464844 8.214844 22.179688 8.355469 21.746094 C 8.496094 21.3125 8.324219 20.835938 7.9375 20.59375 C 5.5625 19.003906 4 16.296875 4 13.21875 C 4 12.078125 4.296875 11.03125 4.6875 10.03125 C 9.6875 15.519531 16.6875 19.164063 24.59375 19.5625 C 24.90625 19.578125 25.210938 19.449219 25.414063 19.210938 C 25.617188 18.96875 25.695313 18.648438 25.625 18.34375 C 25.472656 17.695313 25.375 17.007813 25.375 16.3125 C 25.375 11.414063 29.320313 7.46875 34.21875 7.46875 Z"></path>
                        </svg>
                      </a>
                    </p>
                  </div>

                  <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                    <h6 className="text-uppercase fw-bold mb-4">Contato</h6>

                    <p>
                      <i className="fas fa-envelope me-3"></i>
                      startcursos_contato@gmail.com.br
                    </p>
                    <p>
                      <i className="fas fa-phone me-3"></i> + (48) 2430-8242
                    </p>
                    <p>
                      <i className="fas fa-print me-3"></i> + (48) 3475-5375
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <div
              className="text-center p-4"
              //   style="background-color: rgba(0, 0, 0, 0.05);"
            >
              © 2023 Copyright:
              <a className="text-reset fw-bold" href="">
                StartCursos
              </a>
            </div>
          </footer>
        </section>
      </div>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossOrigin="anonymous"
      ></Script>
    </>
  )
}
