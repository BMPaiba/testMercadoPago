import { PATH, STATUS_LOGIN } from './actions.type'

export const statusLogin = () => {
    return async (disptatch) => {
        try {
            return disptatch ({
                type: STATUS_LOGIN,                
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const path = (pathname) => {
    return async (disptatch) => {
        try {
            return disptatch ({
                type: PATH,   
                payload: pathname             
            })
        } catch (error) {
            console.log(error);
        }
    }
}
