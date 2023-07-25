import React from 'react'
import Card from 'react-bootstrap/Card';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DateRangeIcon from '@mui/icons-material/DateRange';
export const TaskCards = () => {
    return (
        <>
            <Card border="primary" style={{ width: '18rem' }} className="custom-card">
                {/* Title */}
                <Card.Body>
                    <Card.Title>Primary Card Title</Card.Title>

                </Card.Body>

                {/* Custom Section */}
                <div className="custom-section">
                    {/* In Process Chip */}
                    <div className="custom-chip">
                        <Chip
                            label="In Process"
                            style={{ backgroundColor: '#ffb300', color: 'white',  borderRadius: '8px', padding: '0 8px', display: 'flex', alignItems: 'center' }}
                            avatar={<Avatar ><ScheduleIcon /></Avatar>} // Use the ScheduleIcon here
                        />
                    </div>

                    {/* Right Side Chip (Date) */}
                    <Chip
                        label="10/08/2023"
                        style={{ marginLeft: 'auto', color: '#000', borderRadius: '8px', padding: '0 8px', display: 'flex', alignItems: 'center' }}
                        avatar={<Avatar style={{ backgroundColor: '#fff', color: '#000' }}><DateRangeIcon /></Avatar>} // Use the DateRangeIcon here
                    />
                </div>

                {/* Name Chip */}
                <Card.Header className="custom-card-title"><Chip label="John Doe" className="custom-card-name-chip" /></Card.Header>

            </Card>
        </>
    )
}
