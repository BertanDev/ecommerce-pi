'use client'

import { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import Header from '@/components/Header'
import styles from './page.module.css'

const IframeRenderer = ({ iframeCode }: { iframeCode: any }) => {
  return (
    <div
      // className={styles.iframe}
      dangerouslySetInnerHTML={{ __html: iframeCode }}
    />
  )
}

export default function UserProfile() {
  const token = Cookie.get('auth_token')
  const [currentProducts, setCurrentProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [currentCourse, setCurrentCourse] = useState<any>({})

  // console.log(currentProducts)
  // console.log(categories)
  console.log(currentCourse)

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        `http://www.vitorads.com.br/user-product/get-all`,
        {
          method: 'GET',
          headers: new Headers({
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          }),
        },
      )

      const products = await response.json()
      setCurrentProducts(products.user_products)
    }

    async function getCategories() {
      const response = await fetch(
        'http://www.vitorads.com.br/category/get-all',
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

    getCategories()
    getData()
  }, [token])

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.menu}>
          {currentProducts.map((product: any) => {
            const category = categories.find(
              (cat: any) => cat.id === Number(product.category_id),
            )

            return (
              <div className={styles.cursoCard} key={product.id}>
                <div className={styles.cardCabecalho}>
                  <p>{product.name}</p>
                  <p>
                    {(category as { name: string })
                      ? category.name
                      : 'Categoria não encontrada'}
                  </p>
                </div>
                <div
                  className={styles.assistir}
                  onClick={() => setCurrentCourse(product)}
                >
                  assistir
                </div>
              </div>
            )
          })}
        </div>

        <div className={styles.playSection}>
          <div className={styles.info}>
            <h2>{currentCourse.name}</h2>
            <IframeRenderer
              // iframeCode={currentCourse.url}
              iframeCode={
                '<iframe width="853" height="480" src="https://www.youtube.com/embed/bXUhonGv24c" title="1 HORA COM AS MÚSICAS MAIS TOCADAS DO DJ LUCAS BEAT" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
              }
            />
            <p>{currentCourse.description}</p>
          </div>
        </div>
      </div>
    </>
  )
}
