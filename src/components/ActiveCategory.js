

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addDataAction } from '../store/categoriesReducer';


const ActiveCategory = () => {

    const [click, setClick] = useState(false);
    const [nameValue, setNameValue] = useState('');
    const [surnameValue, setSurnameValue] = useState('');
    const [phoneValue, setPhoneValue] = useState('');
    const [professionValue, setProfessionValue] = useState('');

    const categories = useSelector(state => state.categories.categories);

    const dispatch = useDispatch()

    let categoryName, index, list;

    if (categories.length > 0) {
        // нахожу имя активной категории
        categoryName = categories.map(cat => cat.isActive ? cat.category : '');
        // нахожу индекс активной категории
        index = categories.findIndex(cat => cat.isActive);

        list = categories[index].contacts;
    }

    let res = categories.length > 0 ?
        list.length > 0 ?
        <table className='mb'>
            <tbody>
                {list.map(item => {
                    return (
                        <>
                            <tr className='contact' 
                                key={item.id}>
                                    <td>{item.name}</td> 
                                    <td>{item.surname}</td> 
                                    <td>{item.profession}</td> 
                                    <td>{item.phone}</td>
                                    <td><button className='btn' onClick={asd(item.id)}>изменить</button></td>
                            </tr>
                            
                        </>
                    )
                })}
            </tbody>
        </table>
        :
        <div>в категории {categoryName} контактов пока нет</div>
        :
        <div></div>
    
    function handlerClick() {
        setClick(!click);
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

    function asd(id) {
        console.log('click')
        console.log(categoryName + ' ' + id)
    }

    let contactField = (
        <div>
            <p>имя: <input value={nameValue} onChange={(e) => setNameValue(e.target.value)} /></p>
            <p>фамилия: <input value={surnameValue} onChange={(e) => setSurnameValue(e.target.value)} /></p>
            <p>профессия: <input value={professionValue} onChange={(e) => setProfessionValue(e.target.value)} /></p>
            <p>телефон: <input value={phoneValue} onChange={(e) => setPhoneValue(e.target.value)} /></p>
            <button className='btn' onClick={saveData}>добавить</button>
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
