'use client'

import { useRouter } from 'next/navigation'
import styles from './header.module.css'

export default function Header() {
  const router = useRouter()

  return (
    <header className={styles.cabecalho}>
      <div className="container">
        <div className="row">
          <div className="col order-first">
            <ul className="nav justify-content-center p-lg-2">
              <li className="nav-item">
                <a
                  className="nav-link text-light l fw-bold"
                  aria-current="page"
                  onClick={() => router.push('/products')}
                >
                  <h2>Start Cursos</h2>
                </a>
              </li>
            </ul>
          </div>

          <div className="col">
            <ul className="nav justify-content-center p-lg-2 mt-2">
              <li className="nav-item">
                <a
                  className="nav-link fw-bold text-light "
                  aria-current="page"
                  onClick={() => router.push('/products')}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link fw-bold text-light"
                  onClick={() => router.push('/products')}
                >
                  Cursos
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link fw-bold text-light"
                  onClick={() => router.push('/products')}
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
                  className="nav-link text-light l fw-bold "
                  aria-current="page"
                  href="#"
                >
                  Usuário
                </a>
              </li>
              <button onClick={() => router.push('/shop-cart')}>
                carrinho
              </button>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}
