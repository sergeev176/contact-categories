

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    addCategoryAction, 
    addActiveStateAction,
    removeActiveStateAction,
    removeCategoryAction } from '../store/categoriesReducer';

import AddButton from './addButton';

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

    function isActive(id) {
        dispatch(removeActiveStateAction());
        dispatch(addActiveStateAction(id));
    }

    function removeCategory(id) {
        dispatch(removeCategoryAction(id));
    }

    return (
        <div className='text-center'>
            <h1>Категории</h1>
            <div className='mb'>
                {!showInput ?
                    <div>
                        <button className='btn mr' onClick={() => setShowInput(true)}>добавить категорию</button>
                        <AddButton />
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
                                        <button className='btn' onClick={() => removeCategory(cat.id)}>удалить категорию</button>
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
