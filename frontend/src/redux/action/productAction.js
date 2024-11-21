import axios from 'axios';

import {
    PRODUCT_LIST_REQ,
    PRODUCT_LIST_REQ_FAIL,
    PRODUCT_LIST_REQ_SUCCESS,
    PRODUCT_DETAIL_REQ,
    PRODUCT_DETAIL_REQ_FAIL,
    PRODUCT_DETAIL_REQ_SUCCESS,
  } from "../constant/productConstant";

  import { baseUrl } from '../constant/baseUrl';


  export const productListAction = () => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQ});
    const {data} = await axios.get(`${baseUrl}/api/products`);
    console.log("API Response:", data); 
    dispatch({type: PRODUCT_LIST_REQ_SUCCESS, payload:data})
    } catch (error) {
        dispatch({
            type:PRODUCT_LIST_REQ_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
    
  }

  export const productAction = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAIL_REQ});
    const {data} = await axios.get(`${baseUrl}/api/products/${id}`);
    dispatch({type: PRODUCT_DETAIL_REQ_SUCCESS, payload:data})
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAIL_REQ_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
    
  }