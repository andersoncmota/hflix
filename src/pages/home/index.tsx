import React, { useState } from 'react'
import {
  EyeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { Card, Typography, Layout, Menu, Button } from 'antd'
import Link from 'next/link'
import HeaderComponent from '../../components/Header'
import Image from 'next/image'

const { Header, Sider, Content } = Layout
const { Meta } = Card
const { Title, Text } = Typography

interface Props {
  categories: any
  animes?: any
}

export default function Home({ categories, animes = [] }: Props) {
  const [animesList, setAnimesList] = useState(animes)

  const searchAnimes = (value: string) => {
    console.log(
      value,
      animes.filter((anime: any) =>
        anime.attributes.canonicalTitle
          .toLowerCase()
          .includes(value.toLowerCase()),
      ),
    )
    setAnimesList(
      animes.filter((anime: any) =>
        anime.attributes.canonicalTitle
          .toLowerCase()
          .includes(value.toLowerCase()),
      ),
    )
  }
  console.log('PROPPPPPPSSSSSS', animes)
  return (
    <Layout>
      <HeaderComponent onSearchChange={(value) => searchAnimes(value)} />
      <Layout>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
          }}
        >
          {animes.length && (
            <div>
              <Title level={2}>Middle School</Title>

              <div className="gridItems">
                {animesList.map((anime) => (
                  <Link key={anime.id} href={`/item/${anime.slug}`} passHref>
                    <a>
                      <Card
                        hoverable
                        cover={
                          <Image
                            alt={anime.attributes.canonicalTitle}
                            src={
                              anime.attributes.posterImage &&
                              anime.attributes.posterImage.original
                            }
                            width={240}
                            height={300}
                            layout="responsive"
                          />
                        }
                      >
                        <Meta
                          title={anime.attributes.canonicalTitle}
                          description={`${anime.attributes.synopsis.substring(
                            0,
                            50,
                          )}...`}
                        />
                        <Button
                          type="primary"
                          icon={<EyeOutlined />}
                          block
                          style={{ marginTop: '20px' }}
                        >
                          Mais informações
                        </Button>
                      </Card>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  )
}

export const getServerSideProps = async (context: any) => {
  const { condicao } = context.query

  const animeResp = await fetch('https://kitsu.io/api/edge/anime')
  const anime = await animeResp.json()

  const categoriesResp = await fetch('https://kitsu.io/api/edge/categories')
  const categories = await categoriesResp.json()

  const categoriesFormatted = categories.data.map((category: any) => {
    return {
      key: category.id,
      label: category.attributes.title,
      slug: category.attributes.slug,
    }
  })

  return {
    props: {
      categories: categoriesFormatted,
      animes: anime.data,
    },
  }
}
