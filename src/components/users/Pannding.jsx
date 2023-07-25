import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { TaskCard } from './TaskCard'
import { Main } from './Main'

export const Pannding = () => {
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
