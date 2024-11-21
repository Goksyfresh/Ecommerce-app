import axios from 'axios'
import { persistor } from '../store'
import {
    USER_LOGIN_REQ, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_REGISTER_REQ, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL
} from '../constant/userConstant'
import { baseUrl } from '../constant/baseUrl'

//user login action

export const userLoginAction = (email,password) => async (dispatch) => {
    try {
        dispatch({type: USER_LOGIN_REQ})
        const config = {
            headers: {
                "Content-Type": 'application/json'
            }
        }

        const {data}= await axios.post(`${baseUrl}/api/users/login`, {email, password}, config)

        dispatch({type: USER_LOGIN_SUCCESS, payload: data});
        // localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
       dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.response.data.message
       })
    }
}


// user logout
export const userLogoutAction = () => async (dispatch) => {
    await persistor.purge();  // Clears the persisted Redux state
    dispatch({ type: USER_LOGOUT });
    document.location.href = '/login';
};

//user register action
export const userRegisterAction = (name, email, password) => async (dispatch)=> {
    try {
        dispatch({
            type: USER_REGISTER_REQ
        })

        const config = {
            headers: {
                "Content-Type": 'application/json'
            }
        }

        
        const {data}= await axios.post(`${baseUrl}/api/register`, {name, email, password}, config)

        dispatch({type: USER_REGISTER_SUCCESS, payload: data});
        // localStorage.setItem('userInfo', JSON.stringify(data))
        
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}