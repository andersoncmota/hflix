import React, { useState } from 'react'
import { Typography, Layout } from 'antd'
import HeaderComponent from '../../components/Header'

const { Content } = Layout
const { Title, Text } = Typography

interface Props {
  anime?: any
}

export default function Episode({ anime = null }: Props) {
  const [animesList] = useState(anime)

  return (
    <Layout className="container">
      <HeaderComponent title={animesList.attributes.canonicalTitle} goBack />
      <Content>
        <div className="site-layout-background">
          <div
            className="itemTitle"
            style={{
              backgroundImage: `url(${animesList.attributes.thumbnail.original})`,
            }}
          >
            <Title>{animesList.attributes.canonicalTitle}</Title>
          </div>

          <div className="itemDescription">
            <Title level={2} style={{ textAlign: 'center' }}>
              Sinopse
            </Title>
            <Text>{animesList.attributes.description}</Text>
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export const getServerSideProps = async (context: any) => {
  const { id } = context.query

  const animeResp = await fetch(`https://kitsu.io/api/edge/episodes/${id}`)
  let anime = await animeResp.json()

  return {
    props: {
      anime: anime.data,
    },
  }
}
