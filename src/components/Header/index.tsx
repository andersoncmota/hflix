import React from 'react'
import { Layout, Input } from 'antd'
import Link from 'next/link'

const { Header } = Layout

interface Props {
  onSearchChange: (value: string) => void
}

export default function HeaderComponent({ onSearchChange }: Props) {
  return (
    <Header className="site-layout-header">
      <div className="logo">
        <Link href="/home">
          <a>
            H<span>Flix</span>
          </a>
        </Link>
      </div>
      <div className="search">
        <Input
          placeholder="Buscar pelo nome"
          allowClear
          onChange={(e) => {
            if (onSearchChange) {
              onSearchChange(e.target.value)
            }
          }}
        />
      </div>
    </Header>
  )
}
