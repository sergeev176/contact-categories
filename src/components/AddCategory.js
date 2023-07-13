

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    addCategoryAction, 
    addActiveStateAction,
    removeActiveStateAction } from '../store/categoriesReducer';

const AddCategory = () => {

    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);

    const [showInput, setShowInput] = useState(false);
    const [value, setValue] = useState('');

    function addCategory() {
        if (value) {
            dispatch(addCategoryAction({
                id: Date.now(),
                category: value,
                contacts: [],
                isActive: false,
            }))
            setValue('');
        }
        setShowInput(false);
    }

    function save() {
        localStorage.setItem('categories', JSON.stringify(categories));
    }

    function isActive(id) {
        dispatch(removeActiveStateAction());
        dispatch(addActiveStateAction(id));
    }

    return (
        <div className='text-center'>
            <h1>Категории</h1>
            <div className='mb'>
                {!showInput ?
                    <div>
                        <button className='btn mr' onClick={() => setShowInput(true)}>добавить категорию</button>
                        <button className='btn' onClick={save}>save in localStorage</button>
                    </div>
                    :
                    <div>
                        <input 
                            autoFocus 
                            value={value} 
                            onBlur={addCategory} 
                            onChange={(e) => setValue(e.target.value)} 
                        />
                    </div>
                }
            </div>
            {categories.length > 0 ?
                <div className='body text'>
                    {categories.map(cat => {
                        return <div className='flex s-b mb'
                                    onClick={() => isActive(cat.id)} 
                                    key={cat.id}>
                                        <span className={cat.isActive ? 'str active' : 'str'}>в категории {cat.category} контактов: {cat.contacts.length}</span>
                                        <Link className='btn' to='/active'>добавить контакт</Link>
                                    </div>
                                        
                    })}
                </div>
                :
                <div className='text'>
                    категорий пока нет
                </div>
            }
        </div>
    );
}

export default AddCategory;
