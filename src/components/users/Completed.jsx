import React from 'react'
import { Main } from './Main'
import { Col, Row } from 'react-bootstrap'
import { TaskCard } from './TaskCard'

export const Completed = () => {
  return (
    <Main>
    <Row className='m-2'>
      <Col>
        <TaskCard />
      </Col>
      <Col>
        <TaskCard />
      </Col>
      <Col>
        <TaskCard />
      </Col>
      <Col>
        <TaskCard />
      </Col>
    </Row>
  </Main>
  )
}
