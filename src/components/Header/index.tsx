import React from 'react'
import { useRouter } from 'next/router'
import { Layout, Input } from 'antd'
import Link from 'next/link'
import { ArrowLeftOutlined } from '@ant-design/icons'

const { Header } = Layout

interface Props {
  onSearchChange?: (value: string) => void
  goBack?: boolean
  title?: string
}

export default function HeaderComponent({
  onSearchChange,
  goBack = false,
  title = '',
}: Props) {
  const router = useRouter()

  return (
    <Header className="site-layout-header">
      <div className="logo">
        {goBack ? (
          <button onClick={() => router.back()}>
            <ArrowLeftOutlined /> H <span>Flix</span>
          </button>
        ) : (
          <Link href="/home" passHref>
            <a>
              H <span>Flix</span>
            </a>
          </Link>
        )}
      </div>
      <div className="search">
        {!goBack && (
          <Input
            placeholder="Buscar pelo nome do Anime"
            allowClear
            onChange={(e) => {
              if (onSearchChange) {
                onSearchChange(e.target.value)
              }
            }}
          />
        )}
      </div>
    </Header>
  )
}
