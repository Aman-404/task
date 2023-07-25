import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { TaskCards } from './TaskCards';
import { Base } from '../../../Base/Base';

export const InProcess = () => {
    return (
        <Base>
                <Row className='m-2'>
                    <Col className='mt-2' sm={3}><TaskCards /></Col>
                    <Col className='mt-2 ' sm={3}><TaskCards /></Col>
                    <Col className='mt-2 ' sm={3}><TaskCards /></Col>
                    <Col className='mt-2 ' sm={3}><TaskCards /></Col>
                    
                    <Col className='mt-2' sm={3}><TaskCards /></Col>
                    <Col className='mt-2 ' sm={3}><TaskCards /></Col>
                    <Col className='mt-2 ' sm={3}><TaskCards /></Col>
                    <Col className='mt-2 ' sm={3}><TaskCards /></Col>
                    
                    <Col className='mt-2' sm={3}><TaskCards /></Col>
                    <Col className='mt-2 ' sm={3}><TaskCards /></Col>
                    <Col className='mt-2 ' sm={3}><TaskCards /></Col>
                    <Col className='mt-2 ' sm={3}><TaskCards /></Col>
                    
                    
                </Row>
        </Base>
    )
}
