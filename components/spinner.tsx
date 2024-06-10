import { ConfigProvider, Spin } from 'antd'
import React from 'react'

const Spinner = () => {
  return (
    <ConfigProvider
        theme={{
            token: {
                colorPrimary: "White"
            }
        }}
    >
        <Spin />
    </ConfigProvider>
  )
}

export default Spinner