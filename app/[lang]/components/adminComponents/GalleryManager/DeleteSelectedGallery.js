
import { Button } from '@nextui-org/react';
import React from 'react';
import { MdDelete } from 'react-icons/md';

const DeleteSelectedGallery = ({id}) => {

    const handleDelete = () => {
        console.log('delete', id)
    }
    return (
        <div>
            <Button variant="light" isIconOnly
                onClick={handleDelete} isDisabled 
                className='text-xl text-gray-400 hover:text-red-500'
            >
                <MdDelete />
            </Button>
        </div>
    );
};

export default DeleteSelectedGallery;