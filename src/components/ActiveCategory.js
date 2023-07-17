

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addDataAction, removeContactAction } from '../store/categoriesReducer';
import AddButton from './addButton';


const ActiveCategory = () => {

    let categoryName;
    let index;
    let list;

    const categories = useSelector(state => state.categories.categories);
    const dispatch = useDispatch();

    const [click, setClick] = useState(false);
    const [value, setValue] = useState({
        name: '',
        surname: '',
        phone: '',
        profession: '',
    })


    const handleChange = (e) => {
        const {name, value} = e.target;
        setValue((prev) => {
            return {...prev, id: Date.now(), [name]: value}
        }) 
    }

    function asd(id, value, prop) {
        console.log(id + ' ' + prop + ' ' + value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(addDataAction(value));
        setClick(!click);
    }

    if (categories.length > 0) {
        index = categories.findIndex(cat => cat.isActive);
        if (index === -1) index = 0;
        categoryName = categories[index].category;
        list = categories[index].contacts;
    }

    let form = (
        <form onSubmit={handleSubmit}>
            <h3>name: </h3> <input type='text' name='name' onChange={handleChange} />
            <h3>surname: </h3> <input type='text' name='surname' onChange={handleChange} />
            <h3>profession: </h3> <input type='text' name='profession' onChange={handleChange} />
            <h3>phone: </h3> <input type='text' name='phone' onChange={handleChange} />
            <br />
            <br />
            <button type='submit'>submit</button>
        </form>
    )

    let res = categories.length > 0 && list.length > 0 ?
        <div>
            {list.map(item => {
                    return (
                        <div className='contact flex s-b mb' key={item.id}>
                            <div className='inl-bl'>
                                <span className='contact-item' onClick={() => asd(item.id, item.name, 'name')}>{item.name} </span> 
                                <span className='contact-item' onClick={() => asd(item.id, item.surname, 'surname')}>{item.surname} </span> 
                                <span className='contact-item' onClick={() => asd(item.id, item.profession, 'professoin')}>{item.profession} </span> 
                                <span className='contact-item' onClick={() => asd(item.id, item.phone, 'phone')}>{item.phone} </span>
                            </div>
                            
                            <div className='inl-bl'>
                                <button className='btn' onClick={() => removeContact(item.id)}>удалить</button>
                            </div>
                        </div>

                    ) 
                })}
        </div>
        :
        <div className='text'>контактов пока нет</div>
    
    function handlerClick() {
        setClick(!click);
    }


    function removeContact(id) {
        dispatch(removeContactAction(id));
    }

    

    return (
        <>
            <div className='text-center'>
                {categories.length > 0 ?
                    <>
                        <h1>Категория {categoryName}</h1>
                        {!click ? 
                            <>
                                <button className='btn mb mr' onClick={handlerClick}>добавить контакт</button>
                                <AddButton />
                            </>
                            :
                            <button className='btn mb' onClick={handlerClick}>назад</button>
                        }
                    </>
                    :
                    <>
                        <div className='text mt mb'>категорий нет</div>
                        <Link to='/add' className='btn'>добавить категорию</Link>
                    </>
                }
                <div className='list'>
                    {!click ? 
                        res
                        :
                        form
                    }
                </div>
            </div>
        </>
    );
}

export default ActiveCategory;
