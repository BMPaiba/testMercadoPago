import { PATH, STATUS_LOGIN } from './actions.type'

const initialState = {
    status_login: false,
    pathname: ''
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case STATUS_LOGIN:
            return {
                ...state,
                status_login: true // Actualiza status_login usando el payload
            };
            case PATH:
            return {
                ...state,
                pathname: payload // Actualiza status_login usando el payload
            };
        default:
            return state; // Devuelve el estado sin cambios si no hay acción correspondiente
    }
};

export default reducer;
