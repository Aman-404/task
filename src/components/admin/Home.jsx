import React from 'react'
import { Base } from '../../Base/Base'
import { Col, Container, Row } from 'react-bootstrap'
import { Sidebar } from './Sidebar';
import { Cards } from './Card';
import { Lists } from './List';
export const Home = () => {
    return (
        <Base>
            <Container fluid>
                <Row>
                    <Col sm={2} className='ps-0'>
                        <Sidebar />
                    </Col>
                    <Col sm={10}>
                        <div >
                            <Row >
                                <Col >
                                <Cards state="In Process" statusNumber={10} backgroundColor="#f3eca7" />
                                </Col>
                                <Col>
                                <Cards state="Pending" statusNumber={6} backgroundColor="#f4c2bf" />
                                </Col>
                                <Col>
                                <Cards state="Completed" statusNumber={7} backgroundColor="#d7f7c3" />
                                </Col>
                            </Row>
                            <Lists />
                        </div>
                    </Col>
                </Row>
            </Container>
        </Base>
    )
}
