

const initialState = {
    login: false,
    usercart: [],
    authToken: null,
    darkMode: false
}
let tmp = null
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_LOGIN':
            let token = (action.payload.value) ? action.payload.token : null;
            return {
                ...state,
                login: action.payload.value,
                authToken: token,
                usercart: []
            }
        case 'TOGGLE_DARK':
            return {
                ...state,
                darkMode: !state.darkMode
            }
        case 'ADD_ITEM':
            return {
                ...state,
                usercart: [...state.usercart, action.payload.itm]
            }
        case 'RMV_ITEM':
            tmp = [...state.usercart]
            tmp.splice(action.payload.id, 1)
            return {
                ...state,
                usercart: tmp
            }
        case 'EMPTY_CART':
            return {
                ...state,
                usercart: []
            }
        case 'EDIT_ITEM':
            tmp = [...state.usercart]
            tmp.splice(action.payload.id, 1)
            return {
                ...state,
                usercart: [...tmp, action.payload.itm]
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer
