

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addDataAction, removeContactAction } from '../store/categoriesReducer';


const ActiveCategory = () => {

    const [click, setClick] = useState(false);
    // const [change, setChange] = useState(false);
    
    const [nameValue, setNameValue] = useState('');
    const [surnameValue, setSurnameValue] = useState('');
    const [phoneValue, setPhoneValue] = useState('');
    const [professionValue, setProfessionValue] = useState('');

    const categories = useSelector(state => state.categories.categories);

    const dispatch = useDispatch();

    let categoryName;
    let index;
    let list;

    if (categories.length > 0) {
        index = categories.findIndex(cat => cat.isActive);
        categoryName = categories[index].category;
        list = categories[index].contacts;
    }

    let res = categories.length > 0 && list.length > 0 ?
        <div>
            {list.map(item => {
                    return (
                        <div className='contact' key={item.id}>
                            <div className='inl-bl'>
                                <span onClick={() => asd(item.id, 'name')}>{item.name} </span> 
                                <span onClick={() => asd(item.id, 'surname')}>{item.surname} </span> 
                                <span onClick={() => asd(item.id, 'profession')}>{item.profession} </span> 
                                <span onClick={() => asd(item.id, 'phone')}>{item.phone} </span>
                            </div>
                            <div className='inl-bl'>
                                <button className='btn' onClick={() => isChange(item.id)}>изменить </button>
                                <button className='btn' onClick={() => removeContact(item.id)}>удалить</button>
                            </div>
                        </div>
                            
                    ) 
                })}
        </div>
        :
        <div></div>
    
    function handlerClick() {
        setClick(!click);
    }

    function asd(id, prop) {
        console.log(id + ' ' + prop)

    }

    function isChange(id) { // id контакта
        list.map(item => {
            if (item.id === id) {
                setNameValue(item.name)
                setSurnameValue(item.surname)
                setProfessionValue(item.profession)
                setPhoneValue(item.phone)
            }
            return item
        })
        // dispatch(removeContactAction(id));
        setClick(true)
    }

    function saveData() {
        if (nameValue && surnameValue && professionValue && phoneValue) {
            dispatch(addDataAction({
                id: Date.now(),
                name: nameValue,
                surname: surnameValue,
                profession: professionValue,
                phone: phoneValue,
            }))
            setNameValue('');
            setSurnameValue('');
            setProfessionValue('');
            setPhoneValue('');
            setClick(!click);
        }
    }

    function removeContact(id) {
        dispatch(removeContactAction(id));
    }

    let contactField = (
        <div>
            <p>имя: <input value={nameValue} onChange={(e) => setNameValue(e.target.value)} /></p>
            <p>фамилия: <input value={surnameValue} onChange={(e) => setSurnameValue(e.target.value)} /></p>
            <p>профессия: <input value={professionValue} onChange={(e) => setProfessionValue(e.target.value)} /></p>
            <p>телефон: <input value={phoneValue} onChange={(e) => setPhoneValue(e.target.value)} /></p>
            <button className='btn' onClick={saveData} onBlur={saveData}>сохранить</button>
        </div>
    )

    return (
        <>
            <div className='text-center'>
                {categories.length > 0 ?
                    <>
                        <h1>Категория {categoryName}</h1>
                        <button className='btn mb' onClick={handlerClick}>добавить контакт</button>
                    </>
                    :
                    <>
                        <div className='text mt mb'>категорий нет</div>
                        <Link to='/add' className='btn'>добавить категорию</Link>
                    </>
                }
                
            </div>
            <div className='list'>
                {!click ? 
                    res
                    :
                    contactField
                }
            </div>
        </>
    );
}

export default ActiveCategory;
