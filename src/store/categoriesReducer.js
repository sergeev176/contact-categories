

const defaultState = 
    JSON.parse(localStorage.getItem('categories')) ? 
    { categories: JSON.parse(localStorage.getItem('categories')) } 
    :
    { categories: [] }

const ADD_CATEGORY = 'ADD_CATEGORY';
const REMOVE_CATEGORY = 'REMOVE_CATEGORY';

const ADD_ACTIVE_STATE = 'ADD_ACTIVE_STATE';
const REMOVE_ACTIVE_STATE = 'REMOVE_ACTIVE_STATE';

const ADD_DATA = 'ADD_DATA';
const REMOVE_CONTACT = 'REMOVE_CONTACT';

export const categoriesReducer = (state = defaultState, action) => {
    switch(action.type) {
        case ADD_CATEGORY: 
            return {...state, categories: [...state.categories, action.payload]};

        case REMOVE_CATEGORY:
            return {...state, categories: [...state.categories.filter(cat => cat.id !== action.payload)]};
        
        case ADD_ACTIVE_STATE:
            return {...state, categories: state.categories.map(cat => {
                if (cat.id === action.payload) {
                    return {
                        ...cat,
                        isActive : true
                    }
                }
                return cat
            })}

        case REMOVE_ACTIVE_STATE:
            return {...state, categories: state.categories.map(cat => {
                if (cat.isActive) {
                    return {
                        ...cat,
                        isActive: false
                    }
                }
                return cat
            })}

        case ADD_DATA:
            return {...state, categories: state.categories.map(cat => {
                if (cat.isActive) {
                    return {
                        ...cat,
                        contacts: [...cat.contacts, action.payload]
                    }
                }
                return cat
            })}

        case REMOVE_CONTACT:
            return {...state, categories: state.categories.map(cat => {
                if (cat.isActive) {
                    return {
                        ...cat,
                        contacts: cat.contacts.filter(cont => cont.id !== action.payload)
                    }
                }
                return cat
            })}


        default: 
            return state;
    }
}

export const addCategoryAction = (payload) => ({ type: ADD_CATEGORY, payload});
export const addActiveStateAction = (payload) => ({ type: ADD_ACTIVE_STATE, payload });
export const removeActiveStateAction = (payload) => ({ type: REMOVE_ACTIVE_STATE, payload });
export const addDataAction = (payload) => ({ type: ADD_DATA, payload });
export const removeContactAction = (payload) => ({ type: REMOVE_CONTACT, payload });
export const removeCategoryAction = (payload) => ({ type: REMOVE_CATEGORY, payload });
