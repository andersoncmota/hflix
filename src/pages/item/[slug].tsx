import { EyeOutlined, SearchOutlined } from '@ant-design/icons'
import { Card, Typography, Layout, Menu, Button } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const { Header, Content, Footer, Sider } = Layout
const { Meta } = Card
const { Title, Text } = Typography

interface Props {
  categories: any
  items: any
}

export default function Item({ categories, items }: Props) {
  console.log('PROPPPPPPSSSSSS', items)
  return (
    <Layout className="container">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken)
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type)
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline">
          {categories.map((category: any) => (
            <Menu.Item key={category.id}>
              <Link href={`/category/${category.slug}`}>
                <a>
                  <span>{category.label}</span>
                </a>
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout style={{ background: '#fff', padding: '0 16px' }}>
        {/* <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        >
          <Title>h1. Ant Design</Title>
        </Header> */}
        <Content>
          <div className="site-layout-background" style={{ minHeight: 360 }}>
            imagem aqui
            <Title level={2}>h2. Ant Design</Title>
            <div className="gridItem">aaaaaaaaaaaaa</div>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export const getServerSideProps = async (context: any) => {
  const { condicao } = context.query

  const itemsResp = await fetch('https://kitsu.io/api/edge/categories/1/anime')
  const items = await itemsResp.json()

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
      items: items.data,
    },
  }
}
