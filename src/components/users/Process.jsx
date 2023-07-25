import React from 'react'
import { Main } from './Main'
import { TaskCard } from './TaskCard'
import { Col, Row } from 'react-bootstrap'

export const Process = () => {
    return (
        <div>

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
        </div>
    )
}
