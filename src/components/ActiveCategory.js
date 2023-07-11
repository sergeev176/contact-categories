

import React from 'react';
import { useSelector } from 'react-redux';


const ActiveCategory = () => {

    const categories = useSelector(state => state.categories.categories)

    let res = categories.map(cat => cat.isActive ? cat.category : '')

    return (
        <div className='text-center'>
            <h1>Active category</h1>
            <div className='text'>
                {res}
            </div>
        </div>
    );
}

export default ActiveCategory;
