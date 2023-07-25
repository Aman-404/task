import React from 'react'
import Card from 'react-bootstrap/Card';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
export const Cards = ({ state, statusNumber, backgroundColor  }) => {

    const getIcon = () => {
        switch (state.toLowerCase()) {
            case 'in process':
                return <AccessTimeFilledIcon style={{ color: '#a16207',  }} />;
            case 'pending':
                return <HourglassEmptyIcon style={{ color: '#f44343'}} />;
            case 'completed':
                return <CheckCircleIcon style={{ color: '#4caf50'}} />;
            default:
                return null;
        }
    };
    return (
        <div>
            <Card
                bg="light"
                style={{ width: '18rem' }}
                className="mb-2 bg-white mt-4 ml-4 shadow custom-cards"
            >
                <Card.Body className='p-0'>
                    <div className="custom-title">
                        <div
                        className="custom-icon"  
                        style={{ backgroundColor: backgroundColor }}
                        >
                            {getIcon()}
                        </div>
                        <span className="status-text">{state}</span>
                    </div>
                    <div className="status-number"><span>{statusNumber}</span></div>
                </Card.Body>
            </Card>
        </div>
    );
}
