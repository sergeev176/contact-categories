

import React from 'react';
import { useSelector } from 'react-redux';

const AddButton = () => {

    const categories = useSelector(state => state.categories.categories);


    function save() {
        localStorage.setItem('categories', JSON.stringify(categories));
    }

    return (
        <button className='btn' onClick={save}>save in localStorage</button>
    );
}

export default AddButton;
