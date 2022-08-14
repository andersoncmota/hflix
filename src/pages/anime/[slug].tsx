import React, { useState, useEffect } from 'react'
import { EyeOutlined, StarFilled } from '@ant-design/icons'
import { Typography, Layout, Card, Button } from 'antd'
import HeaderComponent from '../../components/Header'
import Link from 'next/link'
import Image from 'next/image'

const { Content } = Layout
const { Title, Text } = Typography
const { Meta } = Card

interface Props {
  anime?: any
}

export default function Anime({ anime = null }: Props) {
  const [animesList] = useState(anime)
  const [episodes, setEpisodes] = useState([])

  const getEpisodes = async () => {
    const resp = await fetch(
      `${animesList.relationships.episodes.links.related}`,
    )

    const data = await resp.json()

    setEpisodes(data.data)
  }

  useEffect(() => {
    getEpisodes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animesList])

  return (
    <Layout className="container">
      <HeaderComponent title={animesList.attributes.canonicalTitle} goBack />
      <Content>
        <div className="site-layout-background">
          <div
            className="itemTitle"
            style={{
              backgroundImage: `url(${animesList.attributes.coverImage.original})`,
            }}
          >
            <Title>{animesList.attributes.canonicalTitle}</Title>
          </div>
          <div className="itemDetails">
            <div>
              <div className="ageRating">{animesList.attributes.ageRating}</div>
              <span>{animesList.attributes.ageRatingGuide}</span>
            </div>

            <div>
              <div className="averageRating">
                <StarFilled />
              </div>
              <span>
                {animesList.attributes.averageRating} classificação média
              </span>
            </div>
          </div>
          <div className="itemDescription">
            <Title level={2} style={{ textAlign: 'center' }}>
              Sinopse
            </Title>
            <Text>{animesList.attributes.description}</Text>
          </div>

          {episodes.length > 0 && episodes[0].attributes.canonicalTitle && (
            <>
              <Title level={2} style={{ textAlign: 'center' }}>
                Episódios
              </Title>

              {console.log('episodes', episodes)}

              <div className="gridItems" style={{ padding: 10 }}>
                {episodes.map((episode: any) => (
                  <Link
                    key={episode.id}
                    href={`/episode/${episode.id}`}
                    passHref
                  >
                    <a className="itemCardWidth">
                      <Card
                        hoverable
                        cover={
                          <Image
                            alt={episode.attributes.canonicalTitle}
                            src={
                              episode.attributes.thumbnail &&
                              episode.attributes.thumbnail.original
                            }
                            width={240}
                            height={300}
                            layout="responsive"
                          />
                        }
                      >
                        <Meta
                          title={episode.attributes.canonicalTitle}
                          description={`${episode.attributes.description.substring(
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
            </>
          )}

          {animesList.attributes.youtubeVideoId && (
            <>
              <Title level={2} style={{ textAlign: 'center' }}>
                Trailler
              </Title>

              <div className="itemVideo">
                <iframe
                  src={`https://www.youtube.com/embed/${animesList.attributes.youtubeVideoId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope;"
                  allowFullScreen
                  title="trailler"
                ></iframe>
              </div>
            </>
          )}
        </div>
      </Content>
    </Layout>
  )
}

export const getServerSideProps = async (context: any) => {
  const { slug } = context.query

  const animeResp = await fetch(
    `https://kitsu.io/api/edge/anime?filter[slug]=${slug}`,
  )
  let anime = await animeResp.json()

  if (anime.data.length) {
    anime = anime.data[0]
  } else {
    anime = null
  }

  return {
    props: {
      anime,
    },
  }
}
