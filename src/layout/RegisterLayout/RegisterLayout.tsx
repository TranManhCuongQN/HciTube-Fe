import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from 'src/components/Header'

const RegisterLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default RegisterLayout
