import React from 'react'
import { Header } from './Header'
import { TaskCard } from './TaskCard'
import { Col, Row } from 'react-bootstrap'


export const Main = ({ children }) => {
  return (
    <>
      <Header />
      
      {children}
    </>
  )
}
