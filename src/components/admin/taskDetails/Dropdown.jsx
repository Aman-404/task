import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


export function Dropdowns() {
    const [selectedItem, setSelectedItem] = useState('To Do');
    const handleDropdownSelect = (eventKey) => {
        setSelectedItem(eventKey);
    };
    return (
        <div >
            <DropdownButton
                id="dropdown-basic-button"
                title={selectedItem}
                onSelect={handleDropdownSelect}
                variant="secondary"
            >
                <Dropdown.Item eventKey=" In Process">In Process</Dropdown.Item>
                <Dropdown.Item eventKey="Completed">Completed</Dropdown.Item>
            </DropdownButton>
        </div>
    );
}
