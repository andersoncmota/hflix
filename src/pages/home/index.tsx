import React, { useState } from 'react'
import { EyeOutlined } from '@ant-design/icons'
import { Card, Typography, Layout, Button } from 'antd'
import Link from 'next/link'
import HeaderComponent from '../../components/Header'
import Image from 'next/image'

const { Content } = Layout
const { Meta } = Card
const { Title } = Typography

interface Props {
  categories: any
  animes?: any
}

export default function Home({ animes = [] }: Props) {
  const [animesList, setAnimesList] = useState(animes)

  const searchAnimes = (value: string) => {
    setAnimesList(
      animes.filter((anime: any) =>
        anime.attributes.canonicalTitle
          .toLowerCase()
          .includes(value.toLowerCase()),
      ),
    )
  }

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
              <Title level={2}>Tudo sobre Animes</Title>

              <div className="gridItems">
                {animesList.map((anime) => (
                  <Link
                    key={anime.id}
                    href={`/anime/${anime.attributes.slug}`}
                    passHref
                  >
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
  const {} = context.query

  const animeResp = await fetch('https://kitsu.io/api/edge/anime')
  const anime = await animeResp.json()

  return {
    props: {
      animes: anime.data,
    },
  }
}
